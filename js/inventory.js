import storage from "./storage.js";
import { sanitizeInput, validateRequired } from "./validators.js";
import session from "./session.js";

const INVENTORY_ITEMS_KEY = "mlbt_inventory_items";
const INVENTORY_MOVEMENTS_KEY = "mlbt_inventory_movements";
const MOVEMENT_TYPES = Object.freeze(["entrada", "salida", "ajuste"]);
const INVENTORY_RECORD_PREFIX = "PRD";

function createId(prefix) {
	return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

function normalizeCollection(collection) {
	return Array.isArray(collection) ? collection : [];
}

function createSequentialRegistration(prefix, sequence) {
	return prefix + "-" + String(sequence).padStart(4, "0");
}

function extractRegistrationSequence(registrationNumber, prefix) {
	var expression = new RegExp("^" + prefix + "-(\\d+)$");
	var match = String(registrationNumber || "").match(expression);

	if (!match) {
		return 0;
	}

	return Number(match[1]) || 0;
}

function getNextInventoryRegistrationNumber(items) {
	var maxSequence = normalizeCollection(items).reduce(function (currentMax, item) {
		return Math.max(currentMax, extractRegistrationSequence(item.registrationNumber, INVENTORY_RECORD_PREFIX));
	}, 0);

	return createSequentialRegistration(INVENTORY_RECORD_PREFIX, maxSequence + 1);
}

function normalizeInventoryItem(item, index) {
	var stockValue = Number(item.stock);
	var stockMinValue = Number(item.stockMin);

	return {
		id: sanitizeInput(item.id) || createId("item"),
		registrationNumber: sanitizeInput(item.registrationNumber) || createSequentialRegistration(INVENTORY_RECORD_PREFIX, index + 1),
		nombre: sanitizeInput(item.nombre),
		categoria: sanitizeInput(item.categoria),
		unidad: sanitizeInput(item.unidad),
		stock: Number.isFinite(stockValue) ? stockValue : 0,
		stockMin: Number.isFinite(stockMinValue) ? stockMinValue : 0,
		estado: sanitizeInput(item.estado) || "Activo",
		createdAt: item.createdAt || new Date().toISOString()
	};
}

function loadInventoryItems() {
	var storedItems = normalizeCollection(storage.get(INVENTORY_ITEMS_KEY, []));
	var migratedItems = storedItems.map(function (item, index) {
		return normalizeInventoryItem(item, index);
	});
	var shouldSyncStorage = JSON.stringify(storedItems) !== JSON.stringify(migratedItems);

	if (shouldSyncStorage) {
		saveInventoryItems(migratedItems);
	}

	return migratedItems;
}

function saveInventoryItems(items) {
	return storage.set(INVENTORY_ITEMS_KEY, normalizeCollection(items));
}

function loadInventoryMovements() {
	return normalizeCollection(storage.get(INVENTORY_MOVEMENTS_KEY, []));
}

function saveInventoryMovements(movements) {
	return storage.set(INVENTORY_MOVEMENTS_KEY, normalizeCollection(movements));
}

function buildInventoryItem(payload) {
	var stockValue = Number(payload.stock);
	var stockMinValue = Number(payload.stockMin);

	return {
		id: createId("item"),
		registrationNumber: sanitizeInput(payload.registrationNumber),
		nombre: sanitizeInput(payload.nombre),
		categoria: sanitizeInput(payload.categoria),
		unidad: sanitizeInput(payload.unidad),
		stock: Number.isFinite(stockValue) ? stockValue : 0,
		stockMin: Number.isFinite(stockMinValue) ? stockMinValue : 0,
		estado: sanitizeInput(payload.estado) || "Activo",
		createdAt: new Date().toISOString()
	};
}

function buildMovement(payload) {
	return {
		id: createId("move"),
		itemId: sanitizeInput(payload.itemId),
		tipo: sanitizeInput(payload.tipo).toLowerCase(),
		cantidad: Number(payload.cantidad),
		fecha: new Date().toISOString(),
		motivo: sanitizeInput(payload.motivo),
		usuarioId: sanitizeInput(payload.usuarioId)
	};
}

function getCurrentUserId() {
	var currentUser = session.getUser();
	return currentUser && currentUser.id ? currentUser.id : "system-local";
}

function addInventoryItem(payload) {
	var items = loadInventoryItems();
	var registrationNumber = sanitizeInput(payload.registrationNumber) || getNextInventoryRegistrationNumber(items);
	var nombre = sanitizeInput(payload.nombre);
	var categoria = sanitizeInput(payload.categoria);
	var unidad = sanitizeInput(payload.unidad);
	var estado = sanitizeInput(payload.estado);
	var stock = Number(payload.stock);
	var stockMin = Number(payload.stockMin);

	if (!validateRequired(registrationNumber) || !validateRequired(nombre) || !validateRequired(categoria) || !validateRequired(unidad) || !validateRequired(estado)) {
		return {
			success: false,
			message: "Todos los campos del ítem son obligatorios."
		};
	}

	if (!Number.isFinite(stock) || stock < 0 || !Number.isFinite(stockMin) || stockMin < 0) {
		return {
			success: false,
			message: "Stock y stock mínimo deben ser números válidos mayores o iguales a cero."
		};
	}

	var duplicatedItem = items.some(function (item) {
		return String(item.nombre || "").toLowerCase() === nombre.toLowerCase() && String(item.unidad || "").toLowerCase() === unidad.toLowerCase();
	});

	if (duplicatedItem) {
		return {
			success: false,
			message: "Ya existe un ítem con el mismo nombre y unidad."
		};
	}

	items.push(buildInventoryItem({
		registrationNumber: registrationNumber,
		nombre: nombre,
		categoria: categoria,
		unidad: unidad,
		stock: stock,
		stockMin: stockMin,
		estado: estado
	}));

	if (!saveInventoryItems(items)) {
		return {
			success: false,
			message: "No fue posible guardar el ítem."
		};
	}

	return {
		success: true,
		message: "Ítem registrado correctamente."
	};
}

function calculateNextStock(currentStock, movementType, quantity) {
	if (movementType === "entrada") {
		return currentStock + quantity;
	}

	if (movementType === "salida") {
		return currentStock - quantity;
	}

	return currentStock + quantity;
}

function registerMovement(payload) {
	var itemId = sanitizeInput(payload.itemId);
	var movementType = sanitizeInput(payload.tipo).toLowerCase();
	var quantity = Number(payload.cantidad);
	var reason = sanitizeInput(payload.motivo);
	var items = loadInventoryItems();
	var movements = loadInventoryMovements();

	if (!validateRequired(itemId) || !validateRequired(movementType) || !validateRequired(reason)) {
		return {
			success: false,
			message: "Todos los campos del movimiento son obligatorios."
		};
	}

	if (MOVEMENT_TYPES.indexOf(movementType) === -1) {
		return {
			success: false,
			message: "El tipo de movimiento no es valido."
		};
	}

	if (!Number.isFinite(quantity) || quantity === 0) {
		return {
			success: false,
			message: "La cantidad del movimiento debe ser un número distinto de cero."
		};
	}

	if ((movementType === "entrada" || movementType === "salida") && quantity < 0) {
		return {
			success: false,
			message: "Entrada y salida requieren una cantidad positiva."
		};
	}

	var itemIndex = items.findIndex(function (item) {
		return item.id === itemId;
	});

	if (itemIndex === -1) {
		return {
			success: false,
			message: "El ítem seleccionado no existe."
		};
	}

	var targetItem = items[itemIndex];
	var nextStock = calculateNextStock(Number(targetItem.stock), movementType, quantity);

	if (nextStock < 0) {
		return {
			success: false,
			message: "El movimiento no puede dejar el stock en negativo."
		};
	}

	targetItem.stock = nextStock;
	items[itemIndex] = targetItem;

	movements.push(buildMovement({
		itemId: itemId,
		tipo: movementType,
		cantidad: quantity,
		motivo: reason,
		usuarioId: payload.usuarioId || getCurrentUserId()
	}));

	if (!saveInventoryItems(items) || !saveInventoryMovements(movements)) {
		return {
			success: false,
			message: "No fue posible registrar el movimiento."
		};
	}

	return {
		success: true,
		message: "Movimiento registrado correctamente."
	};
}

function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function appendCell(row, value) {
	var cell = document.createElement("td");
	cell.textContent = value;
	row.appendChild(cell);
}

function renderInventoryTable(tableBodyId) {
	var tableBody = document.getElementById(tableBodyId);
	var items = loadInventoryItems();

	if (!tableBody) {
		return;
	}

	clearNode(tableBody);

	if (items.length === 0) {
		var emptyRow = document.createElement("tr");
		var emptyCell = document.createElement("td");
		emptyCell.colSpan = 8;
		emptyCell.textContent = "No hay ítems registrados en inventario.";
		emptyRow.appendChild(emptyCell);
		tableBody.appendChild(emptyRow);
		return;
	}

	items.forEach(function (item) {
		var row = document.createElement("tr");
		var stockValue = Number(item.stock);
		var stockMinValue = Number(item.stockMin);
		var alertLabel = stockValue <= stockMinValue ? "Stock bajo" : "Stock estable";

		if (stockValue <= stockMinValue) {
			row.classList.add("inventory-row--warning");
		}

		appendCell(row, alertLabel);
		appendCell(row, item.registrationNumber || "Sin registro");
		appendCell(row, item.nombre || "Sin nombre");
		appendCell(row, item.categoria || "Sin categoría");
		appendCell(row, item.unidad || "Sin unidad");
		appendCell(row, String(stockValue));
		appendCell(row, String(stockMinValue));
		appendCell(row, item.estado || "Sin estado");

		tableBody.appendChild(row);
	});
}

function populateInventorySelect(selectId) {
	var selectNode = document.getElementById(selectId);
	var items = loadInventoryItems();

	if (!selectNode) {
		return;
	}

	while (selectNode.options.length > 1) {
		selectNode.remove(1);
	}

	items.forEach(function (item) {
		var option = document.createElement("option");
		option.value = item.id;
		option.textContent = (item.registrationNumber || "Sin registro") + " - " + item.nombre + " (" + item.unidad + ")";
		selectNode.appendChild(option);
	});
}

function initInventoryModule(config) {
	var itemForm = document.getElementById(config.itemFormId);
	var movementForm = document.getElementById(config.movementFormId);
	var itemMessage = document.getElementById(config.itemMessageId);
	var movementMessage = document.getElementById(config.movementMessageId);

	renderInventoryTable(config.tableBodyId);
	populateInventorySelect(config.itemSelectId);

	if (itemForm) {
		itemForm.addEventListener("submit", function (event) {
			event.preventDefault();

			var result = addInventoryItem({
				registrationNumber: getNextInventoryRegistrationNumber(loadInventoryItems()),
				nombre: itemForm.elements.nombre.value,
				categoria: itemForm.elements.categoria.value,
				unidad: itemForm.elements.unidad.value,
				stock: itemForm.elements.stock.value,
				stockMin: itemForm.elements.stockMin.value,
				estado: itemForm.elements.estado.value
			});

			if (itemMessage) {
				itemMessage.textContent = result.message;
			}

			if (result.success) {
				itemForm.reset();
				renderInventoryTable(config.tableBodyId);
				populateInventorySelect(config.itemSelectId);
			}
		});
	}

	if (movementForm) {
		movementForm.addEventListener("submit", function (event) {
			event.preventDefault();

			var result = registerMovement({
				itemId: movementForm.elements.itemId.value,
				tipo: movementForm.elements.tipo.value,
				cantidad: movementForm.elements.cantidad.value,
				motivo: movementForm.elements.motivo.value,
				usuarioId: getCurrentUserId()
			});

			if (movementMessage) {
				movementMessage.textContent = result.message;
			}

			if (result.success) {
				movementForm.reset();
				renderInventoryTable(config.tableBodyId);
				populateInventorySelect(config.itemSelectId);
			}
		});
	}
}

export {
	INVENTORY_ITEMS_KEY,
	INVENTORY_MOVEMENTS_KEY,
	addInventoryItem,
	initInventoryModule,
	loadInventoryItems,
	loadInventoryMovements,
	registerMovement,
	renderInventoryTable,
	saveInventoryItems,
	saveInventoryMovements
};
