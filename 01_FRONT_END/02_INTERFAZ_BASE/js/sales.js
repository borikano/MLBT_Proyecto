import storage from "./storage.js";
import session from "./session.js";
import { renderEmptyState, showAlert } from "./ui.js";

const INVENTORY_ITEMS_KEY = "mlbt_inventory_items";
const INVENTORY_MOVEMENTS_KEY = "mlbt_inventory_movements";
const SALES_STORAGE_KEY = "mlbt_sales_records";

const currentOrder = [];

function createId(prefix) {
	return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

function normalizeCollection(collection) {
	return Array.isArray(collection) ? collection : [];
}

function loadInventoryItems() {
	return normalizeCollection(storage.get(INVENTORY_ITEMS_KEY, []));
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

function loadSales() {
	return normalizeCollection(storage.get(SALES_STORAGE_KEY, []));
}

function saveSales(sales) {
	return storage.set(SALES_STORAGE_KEY, normalizeCollection(sales));
}

function getCurrentUser() {
	return session.getUser() || {
		id: "system-local",
		email: "local@mlbt.com",
		name: "Sistema Local"
	};
}

function estimateUnitPrice(item) {
	var categoryFactor = String(item.categoria || "").length * 180;
	var nameFactor = String(item.nombre || "").length * 120;
	var stockFactor = Number(item.stockMin || 0) * 90;
	return 6000 + categoryFactor + nameFactor + stockFactor;
}

function formatCurrency(value) {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0
	}).format(value);
}

function calculateOrderTotal() {
	return currentOrder.reduce(function (total, item) {
		return total + item.subtotal;
	}, 0);
}

function populateInventorySelect(selectId) {
	var selectNode = document.getElementById(selectId);
	var items = loadInventoryItems().filter(function (item) {
		return item.estado !== "Inactivo" && Number(item.stock) > 0;
	});

	if (!selectNode) {
		return;
	}

	while (selectNode.options.length > 1) {
		selectNode.remove(1);
	}

	items.forEach(function (item) {
		var option = document.createElement("option");
		option.value = item.id;
		option.textContent = item.nombre + " | Stock: " + item.stock + " " + item.unidad;
		selectNode.appendChild(option);
	});
}

function addItemToOrder(payload) {
	var itemId = String(payload.itemId || "").trim();
	var quantity = Number(payload.quantity);
	var inventoryItems = loadInventoryItems();

	if (!itemId) {
		return {
			success: false,
			message: "Debes seleccionar un producto."
		};
	}

	if (!Number.isFinite(quantity) || quantity <= 0) {
		return {
			success: false,
			message: "La cantidad debe ser mayor a cero."
		};
	}

	var selectedItem = inventoryItems.find(function (item) {
		return item.id === itemId;
	});

	if (!selectedItem) {
		return {
			success: false,
			message: "El ítem seleccionado no existe."
		};
	}

	if (Number(selectedItem.stock) < quantity) {
		return {
			success: false,
			message: "No hay stock suficiente para esta venta."
		};
	}

	var existingItem = currentOrder.find(function (item) {
		return item.itemId === itemId;
	});

	if (existingItem) {
		if (existingItem.quantity + quantity > Number(selectedItem.stock)) {
			return {
				success: false,
				message: "La cantidad acumulada supera el stock disponible."
			};
		}

		existingItem.quantity = existingItem.quantity + quantity;
		existingItem.subtotal = existingItem.quantity * existingItem.unitPrice;
	} else {
		var unitPrice = estimateUnitPrice(selectedItem);

		currentOrder.push({
			itemId: selectedItem.id,
			nombre: selectedItem.nombre,
			unidad: selectedItem.unidad,
			quantity: quantity,
			unitPrice: unitPrice,
			subtotal: quantity * unitPrice
		});
	}

	return {
		success: true,
		message: "Producto agregado al pedido."
	};
	}

function renderOrderSummary(listId, totalId) {
	var listNode = document.getElementById(listId);
	var totalNode = document.getElementById(totalId);

	if (!listNode || !totalNode) {
		return;
	}

	while (listNode.firstChild) {
		listNode.removeChild(listNode.firstChild);
	}

	if (currentOrder.length === 0) {
		var emptyItem = document.createElement("li");
		emptyItem.className = "sales-summary__empty";
		emptyItem.textContent = "No hay productos agregados al pedido actual.";
		listNode.appendChild(emptyItem);
		totalNode.textContent = formatCurrency(0);
		return;
	}

	currentOrder.forEach(function (item) {
		var orderItem = document.createElement("li");
		var title = document.createElement("strong");
		var meta = document.createElement("span");

		orderItem.className = "sales-summary__item";
		title.textContent = item.nombre + " x " + item.quantity;
		meta.textContent = item.unidad + " | " + formatCurrency(item.subtotal);

		orderItem.appendChild(title);
		orderItem.appendChild(meta);
		listNode.appendChild(orderItem);
	});

	totalNode.textContent = formatCurrency(calculateOrderTotal());
}

function buildSaleRecord() {
	var currentUser = getCurrentUser();
	return {
		id: createId("sale"),
		fecha: new Date().toISOString(),
		usuarioId: currentUser.id,
		usuarioEmail: currentUser.email,
		items: currentOrder.map(function (item) {
			return {
				itemId: item.itemId,
				nombre: item.nombre,
				unidad: item.unidad,
				quantity: item.quantity,
				unitPrice: item.unitPrice,
				subtotal: item.subtotal
			};
		}),
		total: calculateOrderTotal()
	};
}

function updateInventoryAfterSale(saleRecord) {
	var inventoryItems = loadInventoryItems();
	var movements = loadInventoryMovements();

	for (var index = 0; index < saleRecord.items.length; index += 1) {
		var soldItem = saleRecord.items[index];
		var inventoryIndex = inventoryItems.findIndex(function (item) {
			return item.id === soldItem.itemId;
		});

		if (inventoryIndex === -1) {
			return false;
		}

		var inventoryItem = inventoryItems[inventoryIndex];
		var nextStock = Number(inventoryItem.stock) - soldItem.quantity;

		if (nextStock < 0) {
			return false;
		}

		inventoryItem.stock = nextStock;
		inventoryItems[inventoryIndex] = inventoryItem;

		movements.push({
			id: createId("move"),
			itemId: soldItem.itemId,
			tipo: "salida",
			cantidad: soldItem.quantity,
			fecha: new Date().toISOString(),
			motivo: "Venta registrada",
			usuarioId: saleRecord.usuarioId
		});
	}

	return saveInventoryItems(inventoryItems) && saveInventoryMovements(movements);
}

function confirmSale() {
	if (currentOrder.length === 0) {
		return {
			success: false,
			message: "Debes agregar al menos un producto al pedido."
		};
	}

	var sales = loadSales();
	var saleRecord = buildSaleRecord();
	var inventoryUpdated = updateInventoryAfterSale(saleRecord);

	if (!inventoryUpdated) {
		return {
			success: false,
			message: "No fue posible descontar el stock de inventario."
		};
	}

	sales.push(saleRecord);

	if (!saveSales(sales)) {
		return {
			success: false,
			message: "No fue posible guardar la venta."
		};
	}

	currentOrder.splice(0, currentOrder.length);

	return {
		success: true,
		message: "Venta confirmada correctamente."
	};
}

function renderSalesHistory(tableBodyId) {
	var tableBody = document.getElementById(tableBodyId);
	var sales = loadSales();

	if (!tableBody) {
		return;
	}

	while (tableBody.firstChild) {
		tableBody.removeChild(tableBody.firstChild);
	}

	if (sales.length === 0) {
		renderEmptyState(tableBodyId, 5, "No hay registros disponibles");
		return;
	}

	sales.slice().reverse().forEach(function (sale) {
		var row = document.createElement("tr");
		var idCell = document.createElement("td");
		var dateCell = document.createElement("td");
		var itemsCell = document.createElement("td");
		var totalCell = document.createElement("td");
		var userCell = document.createElement("td");

		idCell.textContent = sale.id;
		dateCell.textContent = new Date(sale.fecha).toLocaleString("es-CO");
		itemsCell.textContent = sale.items.map(function (item) {
			return item.nombre + " x " + item.quantity;
		}).join(", ");
		totalCell.textContent = formatCurrency(Number(sale.total || 0));
		userCell.textContent = sale.usuarioEmail || "Sin usuario";

		row.appendChild(idCell);
		row.appendChild(dateCell);
		row.appendChild(itemsCell);
		row.appendChild(totalCell);
		row.appendChild(userCell);

		tableBody.appendChild(row);
	});
}

function initSalesModule(config) {
	var salesForm = document.getElementById(config.formId);
	var confirmButton = document.getElementById(config.confirmButtonId);

	populateInventorySelect(config.selectId);
	renderOrderSummary(config.summaryListId, config.totalId);
	renderSalesHistory(config.historyTableBodyId);

	if (salesForm) {
		salesForm.addEventListener("submit", function (event) {
			event.preventDefault();

			var result = addItemToOrder({
				itemId: salesForm.elements.itemId.value,
				quantity: salesForm.elements.quantity.value
			});

			showAlert(result.message, result.success ? "success" : "error");

			if (result.success) {
				salesForm.reset();
				renderOrderSummary(config.summaryListId, config.totalId);
			}
		});
	}

	if (confirmButton) {
		confirmButton.addEventListener("click", function () {
			var result = confirmSale();

			showAlert(result.message, result.success ? "success" : "error");

			if (result.success) {
				renderOrderSummary(config.summaryListId, config.totalId);
				renderSalesHistory(config.historyTableBodyId);
				populateInventorySelect(config.selectId);
			}
		});
	}
}

export {
	SALES_STORAGE_KEY,
	addItemToOrder,
	confirmSale,
	initSalesModule,
	loadSales,
	renderOrderSummary,
	renderSalesHistory
};
