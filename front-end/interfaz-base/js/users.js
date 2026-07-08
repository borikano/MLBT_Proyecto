import session from "./session.js";
import {
	getAuditEntries as fetchAuditEntries,
	getUsers as fetchUsers,
	saveAuditEntries as persistAuditEntriesToDataSource,
	saveUsers as persistUsersToDataSource
} from "./services/user-data-service.js";
import { ADMIN_CREDENTIALS } from "./auth.js";
import { showAlert, showConfirmDialog, showPromptDialog } from "./ui.js";
import {
	sanitizeInput,
	validateDigitsOnly,
	validateEmail,
	validateRequired,
	validateStrongPassword
} from "./validators.js";

const USERS_STORAGE_KEY = "mlbt_users";
const USER_AUDIT_STORAGE_KEY = "mlbt_user_audit_log";
const PRIMARY_SYSTEM_ADMIN_ID = "admin-root";
const PRIMARY_SYSTEM_ADMIN_REGISTRATION = "ADM-0001";
const USER_STATUS = Object.freeze({
	ACTIVE: "Activo",
	PENDING_APPROVAL: "Pendiente de aprobación",
	PENDING: "Pendiente de baja",
	INACTIVE: "Retirado"
});
const ROLE_DEFINITIONS = Object.freeze([
	Object.freeze({ key: "system-admin", label: "Administrador del sistema", prefix: "ADM", formSelectable: false }),
	Object.freeze({ key: "store-admin", label: "Administrador de tienda", prefix: "ADT", formSelectable: true }),
	Object.freeze({ key: "waiter", label: "Mesero", prefix: "MES", formSelectable: true }),
	Object.freeze({ key: "cook", label: "Cocinero", prefix: "COC", formSelectable: true })
]);
const AVAILABLE_ROLES = Object.freeze(
	ROLE_DEFINITIONS.filter(function (roleDefinition) {
		return roleDefinition.formSelectable;
	}).map(function (roleDefinition) {
		return roleDefinition.label;
	})
);
const DEFAULT_USERS = Object.freeze([
	{
		id: PRIMARY_SYSTEM_ADMIN_ID,
		registrationNumber: PRIMARY_SYSTEM_ADMIN_REGISTRATION,
		documentNumber: "1000000000",
		firstName: "Administrador",
		lastName: "Principal",
		name: "Administrador Principal",
		phone: "3000000000",
		email: ADMIN_CREDENTIALS.email,
		password: ADMIN_CREDENTIALS.password,
		role: ADMIN_CREDENTIALS.role,
		status: USER_STATUS.ACTIVE,
		canLogin: true,
		createdAt: "2026-04-02T00:00:00.000Z"
	}
]);

function normalizeUsersCollection(users) {
	return Array.isArray(users) ? users : [];
}

function normalizeAuditCollection(entries) {
	return Array.isArray(entries) ? entries : [];
}

function createUserId() {
	return "user-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

function createAuditId() {
	return "audit-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
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

function composeFullName(firstName, lastName) {
	return [sanitizeInput(firstName), sanitizeInput(lastName)].filter(Boolean).join(" ").trim();
}

function getRoleDefinitionByLabel(roleLabel) {
	var normalizedRoleLabel = sanitizeInput(roleLabel);

	return ROLE_DEFINITIONS.find(function (roleDefinition) {
		return roleDefinition.label === normalizedRoleLabel;
	}) || ROLE_DEFINITIONS[1];
}

function isPrimarySystemAdmin(user) {
	return Boolean(
		user && (
			sanitizeInput(user.id) === PRIMARY_SYSTEM_ADMIN_ID ||
			sanitizeInput(user.registrationNumber) === PRIMARY_SYSTEM_ADMIN_REGISTRATION ||
			sanitizeInput(user.email).toLowerCase() === ADMIN_CREDENTIALS.email
		)
	);
}

function isSystemAdmin(user) {
	return Boolean(user) && resolveUserRole(user) === "Administrador del sistema";
}

function isStoreAdmin(user) {
	return Boolean(user) && resolveUserRole(user) === "Administrador de tienda";
}

function isOperationalUser(user) {
	var role = resolveUserRole(user);
	return role === "Mesero" || role === "Cocinero";
}

function getUserStatus(user) {
	var normalizedStatus = sanitizeInput(user && user.status);

	if (normalizedStatus === USER_STATUS.PENDING_APPROVAL || normalizedStatus === USER_STATUS.PENDING || normalizedStatus === USER_STATUS.INACTIVE) {
		return normalizedStatus;
	}

	if (user && user.canLogin === false) {
		return USER_STATUS.INACTIVE;
	}

	return USER_STATUS.ACTIVE;
}

function canUserLogin(user) {
	return getUserStatus(user) === USER_STATUS.ACTIVE && user.canLogin !== false;
}

function canUserViewTarget(currentUser, targetUser) {
	if (!currentUser || !targetUser) {
		return false;
	}

	if (isSystemAdmin(currentUser)) {
		return true;
	}

	if (sanitizeInput(currentUser.id) === sanitizeInput(targetUser.id) || String(currentUser.email || "").toLowerCase() === String(targetUser.email || "").toLowerCase()) {
		return true;
	}

	if (isSystemAdmin(targetUser)) {
		return false;
	}

	if (isStoreAdmin(currentUser)) {
		return isOperationalUser(targetUser);
	}

	return false;
}

function getAssignableRolesForUser(currentUser) {
	if (isSystemAdmin(currentUser)) {
		return ["Administrador de tienda", "Mesero", "Cocinero"];
	}

	if (isStoreAdmin(currentUser)) {
		return ["Mesero", "Cocinero"];
	}

	return [];
}

function loadAuditEntries() {
	return normalizeAuditCollection(fetchAuditEntries());
}

function persistAuditEntries(entries) {
	return persistAuditEntriesToDataSource(normalizeAuditCollection(entries));
}

function appendAuditEntry(action, performedBy, targetUser, metadata) {
	var entries = loadAuditEntries();

	entries.push({
		id: createAuditId(),
		action: action,
		performedById: sanitizeInput(performedBy && performedBy.id),
		performedByEmail: sanitizeInput(performedBy && performedBy.email).toLowerCase(),
		targetUserId: sanitizeInput(targetUser && targetUser.id),
		targetUserEmail: sanitizeInput(targetUser && targetUser.email).toLowerCase(),
		timestamp: new Date().toISOString(),
		metadata: metadata || {}
	});

	persistAuditEntries(entries);
}

function getCurrentSessionUserRecord(users) {
	var currentSessionUser = session.getUser();

	if (!currentSessionUser) {
		return null;
	}

	return normalizeUsersCollection(users).find(function (user) {
		return sanitizeInput(user.id) === sanitizeInput(currentSessionUser.id) || String(user.email || "").toLowerCase() === String(currentSessionUser.email || "").toLowerCase();
	}) || null;
}

function canUserManageTarget(currentUser, targetUser) {
	if (!currentUser || !targetUser) {
		return false;
	}

	if (sanitizeInput(currentUser.id) === sanitizeInput(targetUser.id) || String(currentUser.email || "").toLowerCase() === String(targetUser.email || "").toLowerCase()) {
		return false;
	}

	if (isPrimarySystemAdmin(targetUser)) {
		return false;
	}

	if (isSystemAdmin(currentUser)) {
		return true;
	}

	if (isStoreAdmin(currentUser)) {
		return isOperationalUser(targetUser);
	}

	return false;
}

function canUserDirectlyDeactivate(currentUser, targetUser) {
	return isSystemAdmin(currentUser) && canUserManageTarget(currentUser, targetUser);
}

function canUserRequestDeactivation(currentUser, targetUser) {
	return isStoreAdmin(currentUser) && canUserManageTarget(currentUser, targetUser);
}

function canUserReactivate(currentUser, targetUser) {
	return isSystemAdmin(currentUser) && canUserManageTarget(currentUser, targetUser);
}

function canUserApproveRegistration(currentUser, targetUser) {
	return isSystemAdmin(currentUser) && canUserManageTarget(currentUser, targetUser);
}

function getUserActionState(currentUser, targetUser) {
	var status = getUserStatus(targetUser);

	if (!currentUser || !targetUser) {
		return { type: "disabled", label: "Sin acción", disabled: true };
	}

	if (sanitizeInput(currentUser.id) === sanitizeInput(targetUser.id) || String(currentUser.email || "").toLowerCase() === String(targetUser.email || "").toLowerCase()) {
		return { type: "self", label: "Sesión actual", disabled: true };
	}

	if (isPrimarySystemAdmin(targetUser)) {
		return { type: "protected", label: "Protegido", disabled: true };
	}

	if (status === USER_STATUS.PENDING_APPROVAL) {
		if (canUserApproveRegistration(currentUser, targetUser)) {
			return { type: "approve-registration", label: "Aprobar alta", disabled: false };
		}

		return { type: "approval-pending", label: "Solicitud enviada", disabled: true };
	}

	if (status === USER_STATUS.INACTIVE) {
		if (canUserReactivate(currentUser, targetUser)) {
			return { type: "reactivate", label: "Reactivar", disabled: false };
		}

		return { type: "inactive", label: "Retirado", disabled: true };
	}

	if (status === USER_STATUS.PENDING) {
		if (canUserDirectlyDeactivate(currentUser, targetUser)) {
			return { type: "approve", label: "Aprobar baja", disabled: false };
		}

		return { type: "pending", label: "Solicitud enviada", disabled: true };
	}

	if (canUserDirectlyDeactivate(currentUser, targetUser)) {
		return { type: "deactivate", label: "Desactivar", disabled: false };
	}

	if (canUserRequestDeactivation(currentUser, targetUser)) {
		return { type: "request", label: "Solicitar baja", disabled: false };
	}

	return { type: "disabled", label: "Sin permiso", disabled: true };
}

function resolveUserRole(user) {
	var normalizedRole = sanitizeInput(user.role);

	if (isPrimarySystemAdmin(user)) {
		return "Administrador del sistema";
	}

	if (normalizedRole === "Administrador") {
		return "Administrador de tienda";
	}

	if (normalizedRole === "Administrador del sistema" || normalizedRole === "Administrador de tienda" || normalizedRole === "Mesero" || normalizedRole === "Cocinero") {
		return normalizedRole;
	}

	return "Mesero";
}

function splitLegacyName(name) {
	var normalizedName = sanitizeInput(name);
	var parts = normalizedName.split(/\s+/).filter(Boolean);

	if (parts.length === 0) {
		return {
			firstName: "",
			lastName: ""
		};
	}

	if (parts.length === 1) {
		return {
			firstName: parts[0],
			lastName: ""
		};
	}

	return {
		firstName: parts.slice(0, -1).join(" "),
		lastName: parts.slice(-1).join(" ")
	};
}

function getNextUserRegistrationNumber(roleLabel, users) {
	var roleDefinition = getRoleDefinitionByLabel(roleLabel);
	var maxSequence = normalizeUsersCollection(users).reduce(function (currentMax, user) {
		return Math.max(currentMax, extractRegistrationSequence(user.registrationNumber, roleDefinition.prefix));
	}, 0);

	if (roleDefinition.prefix === "ADM") {
		maxSequence = Math.max(maxSequence, 1);
	}

	return createSequentialRegistration(roleDefinition.prefix, maxSequence + 1);
}

function createRoleCounters(users) {
	return normalizeUsersCollection(users).reduce(function (counters, user) {
		var roleDefinition = getRoleDefinitionByLabel(resolveUserRole(user));
		var registrationSequence = extractRegistrationSequence(user.registrationNumber, roleDefinition.prefix);

		if (isPrimarySystemAdmin(user)) {
			counters.ADM = Math.max(counters.ADM || 0, 1);
			return counters;
		}

		if (registrationSequence > 0) {
			counters[roleDefinition.prefix] = Math.max(counters[roleDefinition.prefix] || 0, registrationSequence);
		}

		return counters;
	}, { ADM: 1, ADT: 0, MES: 0, COC: 0 });
}

function normalizeUserRecord(user, counters) {
	var legacyNameParts = splitLegacyName(user.name);
	var resolvedRole = resolveUserRole(user);
	var roleDefinition = getRoleDefinitionByLabel(resolvedRole);
	var firstName = sanitizeInput(user.firstName || legacyNameParts.firstName);
	var lastName = sanitizeInput(user.lastName || legacyNameParts.lastName);
	var fullName = composeFullName(firstName, lastName) || sanitizeInput(user.name) || "Sin nombre";
	var registrationNumber = "";
	var currentSequence = extractRegistrationSequence(user.registrationNumber, roleDefinition.prefix);
	var isRootAdmin = isPrimarySystemAdmin(user);

	if (isRootAdmin) {
		registrationNumber = PRIMARY_SYSTEM_ADMIN_REGISTRATION;
	} else if (currentSequence > 0) {
		registrationNumber = createSequentialRegistration(roleDefinition.prefix, currentSequence);
	} else {
		counters[roleDefinition.prefix] = (counters[roleDefinition.prefix] || 0) + 1;
		registrationNumber = createSequentialRegistration(roleDefinition.prefix, counters[roleDefinition.prefix]);
	}

	return {
		id: sanitizeInput(user.id) || createUserId(),
		registrationNumber: registrationNumber,
		documentNumber: sanitizeInput(user.documentNumber) || (isRootAdmin ? DEFAULT_USERS[0].documentNumber : ""),
		firstName: firstName || (isRootAdmin ? DEFAULT_USERS[0].firstName : ""),
		lastName: lastName || (isRootAdmin ? DEFAULT_USERS[0].lastName : ""),
		name: fullName || (isRootAdmin ? DEFAULT_USERS[0].name : "Sin nombre"),
		phone: sanitizeInput(user.phone) || (isRootAdmin ? DEFAULT_USERS[0].phone : ""),
		email: sanitizeInput(user.email).toLowerCase(),
		password: String(user.password || "").trim(),
		role: resolvedRole,
		status: isRootAdmin ? USER_STATUS.ACTIVE : getUserStatus(user),
		canLogin: isRootAdmin ? true : canUserLogin(user),
		registrationRequestedAt: sanitizeInput(user.registrationRequestedAt),
		registrationRequestedBy: sanitizeInput(user.registrationRequestedBy),
		registrationApprovedAt: sanitizeInput(user.registrationApprovedAt),
		registrationApprovedBy: sanitizeInput(user.registrationApprovedBy),
		deactivatedAt: sanitizeInput(user.deactivatedAt),
		deactivatedBy: sanitizeInput(user.deactivatedBy),
		authorizedBy: sanitizeInput(user.authorizedBy),
		deactivationReason: sanitizeInput(user.deactivationReason),
		deactivationRequestedAt: sanitizeInput(user.deactivationRequestedAt),
		deactivationRequestedBy: sanitizeInput(user.deactivationRequestedBy),
		createdAt: user.createdAt || new Date().toISOString()
	};
}

function loadUsers() {
	var storedUsers = fetchUsers();
	var normalizedUsers = normalizeUsersCollection(storedUsers);

	if (normalizedUsers.length === 0) {
		saveUsers(DEFAULT_USERS.slice());
		return DEFAULT_USERS.slice();
	}

	var roleCounters = createRoleCounters(normalizedUsers);
	var migratedUsers = normalizedUsers.map(function (user) {
		return normalizeUserRecord(user, roleCounters);
	});
	var shouldSyncStorage = JSON.stringify(normalizedUsers) !== JSON.stringify(migratedUsers);

	if (shouldSyncStorage) {
		saveUsers(migratedUsers);
	}

	return migratedUsers;
}

function saveUsers(users) {
	return persistUsersToDataSource(normalizeUsersCollection(users));
}

function clearElement(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function createTextCell(value) {
	var cell = document.createElement("td");
	cell.textContent = value;
	return cell;
}

function formatDate(isoDate) {
	if (!isoDate) {
		return "Sin fecha";
	}

	var parsedDate = new Date(isoDate);

	if (Number.isNaN(parsedDate.getTime())) {
		return "Sin fecha";
	}

	return parsedDate.toLocaleString("es-CO");
}

function renderUsersTable(tableBodyId) {
	var tableBody = document.getElementById(tableBodyId);
	var users = loadUsers();
	var currentUser = getCurrentSessionUserRecord(users);
	var visibleUsers = users.filter(function (user) {
		return canUserViewTarget(currentUser, user);
	});

	if (!tableBody) {
		return;
	}

	clearElement(tableBody);

	if (visibleUsers.length === 0) {
		var emptyRow = document.createElement("tr");
		var emptyCell = document.createElement("td");
		emptyCell.colSpan = 10;
		emptyCell.textContent = "No hay usuarios visibles para tu perfil.";
		emptyRow.appendChild(emptyCell);
		tableBody.appendChild(emptyRow);
		return;
	}

	visibleUsers.forEach(function (user) {
		var row = document.createElement("tr");
		var actionsCell = document.createElement("td");
		var actionButton = document.createElement("button");
		var actionState = getUserActionState(currentUser, user);
		var statusCell = createTextCell(getUserStatus(user));

		row.appendChild(statusCell);

		actionButton.type = "button";
		actionButton.className = "button button--ghost";
		actionButton.textContent = actionState.label;
		actionButton.disabled = actionState.disabled;

		if (!actionState.disabled) {
			actionButton.addEventListener("click", function () {
				deleteUser(user.id, tableBodyId);
			});
		}

		actionsCell.className = "table-action-cell";
		actionsCell.appendChild(actionButton);
		row.appendChild(actionsCell);

		row.appendChild(createTextCell(user.registrationNumber || "Sin registro"));
		row.appendChild(createTextCell(user.role || "Sin rol"));
		row.appendChild(createTextCell(user.documentNumber || "Sin CC"));
		row.appendChild(createTextCell(user.firstName || "Sin nombres"));
		row.appendChild(createTextCell(user.lastName || "Sin apellidos"));
		row.appendChild(createTextCell(user.phone || "Sin teléfono"));
		row.appendChild(createTextCell(user.email || "Sin correo"));
		row.appendChild(createTextCell(formatDate(user.createdAt)));
		tableBody.appendChild(row);
	});
}

function buildUserRecord(formData, users, currentUser) {
	var roleDefinition = getRoleDefinitionByLabel(formData.role);
	var registrationNumber = getNextUserRegistrationNumber(roleDefinition.label, users);
	var firstName = sanitizeInput(formData.firstName);
	var lastName = sanitizeInput(formData.lastName);
	var email = sanitizeInput(formData.email).toLowerCase();
	var createdBySystemAdmin = isSystemAdmin(currentUser);

	return {
		id: createUserId(),
		registrationNumber: registrationNumber,
		documentNumber: sanitizeInput(formData.documentNumber),
		firstName: firstName,
		lastName: lastName,
		name: composeFullName(firstName, lastName),
		phone: sanitizeInput(formData.phone),
		email: email,
		password: String(formData.password || "").trim(),
		role: roleDefinition.label,
		status: createdBySystemAdmin ? USER_STATUS.ACTIVE : USER_STATUS.PENDING_APPROVAL,
		canLogin: createdBySystemAdmin,
		registrationRequestedAt: new Date().toISOString(),
		registrationRequestedBy: sanitizeInput(currentUser && currentUser.email).toLowerCase(),
		registrationApprovedAt: createdBySystemAdmin ? new Date().toISOString() : "",
		registrationApprovedBy: createdBySystemAdmin ? sanitizeInput(currentUser && currentUser.email).toLowerCase() : "",
		createdAt: new Date().toISOString()
	};
}

function addUser(formData) {
	var users = loadUsers();
	var currentUser = getCurrentSessionUserRecord(users);
	var normalizedDocumentNumber = sanitizeInput(formData.documentNumber);
	var normalizedFirstName = sanitizeInput(formData.firstName);
	var normalizedLastName = sanitizeInput(formData.lastName);
	var normalizedPhone = sanitizeInput(formData.phone);
	var normalizedEmail = sanitizeInput(formData.email).toLowerCase();
	var normalizedPassword = String(formData.password || "").trim();
	var normalizedConfirmPassword = String(formData.confirmPassword || "").trim();
	var normalizedRole = sanitizeInput(formData.role);

	if (!validateRequired(normalizedDocumentNumber) || !validateRequired(normalizedFirstName) || !validateRequired(normalizedLastName) || !validateRequired(normalizedPhone) || !validateRequired(normalizedEmail) || !validateRequired(normalizedPassword) || !validateRequired(normalizedConfirmPassword) || !validateRequired(normalizedRole)) {
		return {
			success: false,
			message: "Todos los campos son obligatorios."
		};
	}

	if (!validateDigitsOnly(normalizedDocumentNumber, 6, 15)) {
		return {
			success: false,
			message: "El número de CC debe contener solo dígitos y entre 6 y 15 caracteres."
		};
	}

	if (!validateDigitsOnly(normalizedPhone, 7, 15)) {
		return {
			success: false,
			message: "El número de teléfono debe contener solo dígitos y entre 7 y 15 caracteres."
		};
	}

	if (!validateEmail(normalizedEmail)) {
		return {
			success: false,
			message: "El correo electrónico no es válido."
		};
	}

	if (!validateStrongPassword(normalizedPassword)) {
		return {
			success: false,
			message: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número."
		};
	}

	if (normalizedPassword !== normalizedConfirmPassword) {
		return {
			success: false,
			message: "La confirmación de contraseña no coincide."
		};
	}

	if (AVAILABLE_ROLES.indexOf(normalizedRole) === -1) {
		return {
			success: false,
			message: "El rol seleccionado no es válido."
		};
	}

	if (getAssignableRolesForUser(currentUser).indexOf(normalizedRole) === -1) {
		return {
			success: false,
			message: "No tienes permisos para crear usuarios con ese rol."
		};
	}

	var emailExists = users.some(function (user) {
		return String(user.email || "").toLowerCase() === normalizedEmail;
	});
	var documentExists = users.some(function (user) {
		return String(user.documentNumber || "") === normalizedDocumentNumber;
	});

	if (emailExists) {
		return {
			success: false,
			message: "Ya existe un usuario registrado con ese correo."
		};
	}

	if (documentExists) {
		return {
			success: false,
			message: "Ya existe un usuario registrado con ese número de CC."
		};
	}

	users.push(buildUserRecord({
		documentNumber: normalizedDocumentNumber,
		firstName: normalizedFirstName,
		lastName: normalizedLastName,
		phone: normalizedPhone,
		email: normalizedEmail,
		password: normalizedPassword,
		role: normalizedRole
	}, users, currentUser));

	var saved = saveUsers(users);
	var createdUser = users[users.length - 1];

	if (!saved) {
		return {
			success: false,
			message: "No fue posible guardar el usuario."
		};
	}

	appendAuditEntry(isSystemAdmin(currentUser) ? "user-created" : "user-registration-requested", currentUser, createdUser, {
		role: normalizedRole
	});

	return {
		success: true,
		message: isSystemAdmin(currentUser)
			? "Usuario registrado correctamente."
			: "Solicitud de registro enviada. Un administrador del sistema debe aprobarla."
	};
}

async function deleteUser(userId, tableBodyId) {
	if (!userId) {
		showAlert("No se pudo identificar el usuario a gestionar.", "error");
		return false;
	}

	var users = loadUsers();
	var currentUser = getCurrentSessionUserRecord(users);
	var targetUser = users.find(function (user) {
		return user.id === userId;
	});

	if (!targetUser) {
		showAlert("El usuario seleccionado no existe.", "error");
		return false;
	}

	if (!currentUser) {
		showAlert("No se pudo validar el usuario actual.", "error");
		return false;
	}

	if (sanitizeInput(currentUser.id) === sanitizeInput(targetUser.id) || String(currentUser.email || "").toLowerCase() === String(targetUser.email || "").toLowerCase()) {
		showAlert("No puedes gestionar tu propio usuario.", "error");
		return false;
	}

	if (isPrimarySystemAdmin(targetUser)) {
		showAlert("El usuario principal del sistema no puede modificarse desde esta vista.", "error");
		return false;
	}

	if (getUserStatus(targetUser) === USER_STATUS.PENDING_APPROVAL) {
		if (!canUserApproveRegistration(currentUser, targetUser)) {
			showAlert("No tienes permisos para aprobar este registro.", "error");
			return false;
		}

		var approvalConfirmation = await showConfirmDialog({
			title: "Aprobar registro",
			message: "¿Deseas aprobar el alta de " + (targetUser.name || "este usuario") + "? Recuperará acceso inmediato al sistema.",
			confirmText: "Aprobar",
			cancelText: "Cancelar"
		});

		if (!approvalConfirmation) {
			showAlert("La aprobación fue cancelada.", "error");
			return false;
		}

		targetUser.status = USER_STATUS.ACTIVE;
		targetUser.canLogin = true;
		targetUser.registrationApprovedAt = new Date().toISOString();
		targetUser.registrationApprovedBy = sanitizeInput(currentUser.email).toLowerCase();

		if (saveUsers(users)) {
			appendAuditEntry("user-registration-approved", currentUser, targetUser, {
				authorizedByRole: currentUser.role
			});
			renderUsersTable(tableBodyId);
			showAlert("Registro aprobado correctamente.", "success");
			return true;
		}

		showAlert("No fue posible aprobar el registro.", "error");
		return false;
	}

	if (getUserStatus(targetUser) === USER_STATUS.INACTIVE) {
		if (!canUserReactivate(currentUser, targetUser)) {
			showAlert("Este usuario ya se encuentra retirado.", "error");
			return false;
		}

		var reactivateConfirmation = await showConfirmDialog({
			title: "Confirmar reactivación",
			message: "¿Deseas reactivar a " + (targetUser.name || "este usuario") + "? Recuperará el acceso al sistema.",
			confirmText: "Reactivar",
			cancelText: "Cancelar"
		});

		if (!reactivateConfirmation) {
			showAlert("La reactivación fue cancelada.", "error");
			return false;
		}

		targetUser.status = USER_STATUS.ACTIVE;
		targetUser.canLogin = true;
		targetUser.deactivatedAt = "";
		targetUser.deactivatedBy = "";
		targetUser.authorizedBy = sanitizeInput(currentUser.email).toLowerCase();
		targetUser.deactivationReason = "";
		targetUser.deactivationRequestedAt = "";
		targetUser.deactivationRequestedBy = "";

		if (saveUsers(users)) {
			appendAuditEntry("user-reactivated", currentUser, targetUser, {
				authorizedByRole: currentUser.role
			});
			renderUsersTable(tableBodyId);
			showAlert("Usuario reactivado correctamente.", "success");
			return true;
		}

		showAlert("No fue posible reactivar el usuario.", "error");
		return false;
	}

	if (canUserRequestDeactivation(currentUser, targetUser)) {
		var requestConfirmation = await showConfirmDialog({
			title: "Solicitar baja",
			message: "Se enviará una solicitud de baja para " + (targetUser.name || "el usuario seleccionado") + ". El registro no se eliminará.",
			confirmText: "Solicitar",
			cancelText: "Cancelar"
		});

		if (!requestConfirmation) {
			showAlert("La solicitud de baja fue cancelada.", "error");
			return false;
		}

		targetUser.status = USER_STATUS.PENDING;
		targetUser.canLogin = false;
		targetUser.deactivationRequestedAt = new Date().toISOString();
		targetUser.deactivationRequestedBy = sanitizeInput(currentUser.email).toLowerCase();

		if (saveUsers(users)) {
			appendAuditEntry("deactivation-requested", currentUser, targetUser, {
				requestedByRole: currentUser.role
			});
			renderUsersTable(tableBodyId);
			showAlert("Solicitud de baja registrada. Un administrador del sistema debe aprobarla.", "success");
			return true;
		}

		showAlert("No fue posible guardar la solicitud de baja.", "error");
		return false;
	}

	if (!canUserDirectlyDeactivate(currentUser, targetUser)) {
		showAlert("No tienes permisos para retirar este usuario.", "error");
		return false;
	}

	var previousStatus = getUserStatus(targetUser);

	var confirmation = await showConfirmDialog({
		title: "Confirmar retiro",
		message: "¿Deseas retirar a " + (targetUser.name || "este usuario") + "? El registro se conservará para auditoría.",
		confirmText: "Retirar",
		cancelText: "Cancelar"
	});

	if (!confirmation) {
		showAlert("La operación fue cancelada.", "error");
		return false;
	}

	targetUser.status = USER_STATUS.INACTIVE;
	targetUser.canLogin = false;
	targetUser.deactivatedAt = new Date().toISOString();
	targetUser.deactivatedBy = sanitizeInput(currentUser.email).toLowerCase();
	targetUser.authorizedBy = sanitizeInput(currentUser.email).toLowerCase();
	targetUser.deactivationReason = previousStatus === USER_STATUS.PENDING ? "Baja aprobada" : "Retiro administrativo";
	targetUser.deactivationRequestedAt = previousStatus === USER_STATUS.PENDING ? targetUser.deactivationRequestedAt : "";
	targetUser.deactivationRequestedBy = previousStatus === USER_STATUS.PENDING ? targetUser.deactivationRequestedBy : "";

	var saved = saveUsers(users);

	if (saved) {
		renderUsersTable(tableBodyId);
		appendAuditEntry("user-deactivated", currentUser, targetUser, {
			authorizedByRole: currentUser.role
		});
		showAlert("Usuario retirado correctamente. El registro se conserva para auditoría.", "success");
	} else {
		showAlert("No fue posible actualizar el estado del usuario.", "error");
	}

	return saved;
}

function configureRoleSelect(roleSelect) {
	if (!roleSelect) {
		return;
	}

	var currentUser = getCurrentSessionUserRecord(loadUsers());
	var assignableRoles = getAssignableRolesForUser(currentUser);
	var options = Array.from(roleSelect.options);

	options.forEach(function (option) {
		if (!option.value) {
			option.hidden = false;
			option.disabled = false;
			return;
		}

		var allowed = assignableRoles.indexOf(option.value) !== -1;
		option.hidden = !allowed;
		option.disabled = !allowed;
	});

	if (assignableRoles.length === 0) {
		roleSelect.disabled = true;
	}
}

function bindDigitsOnlyField(field) {
	if (!field) {
		return;
	}

	field.addEventListener("input", function () {
		field.value = field.value.replace(/\D+/g, "");
	});
}

function updatePasswordMatchState(passwordField, confirmPasswordField, noteNode) {
	if (!passwordField || !confirmPasswordField || !noteNode) {
		return true;
	}

	var passwordValue = String(passwordField.value || "").trim();
	var confirmPasswordValue = String(confirmPasswordField.value || "").trim();
	var hasBothValues = Boolean(passwordValue) && Boolean(confirmPasswordValue);
	var passwordsMatch = passwordValue === confirmPasswordValue;

	passwordField.classList.remove("is-invalid");
	confirmPasswordField.classList.remove("is-invalid");
	noteNode.textContent = "";

	if (!hasBothValues) {
		return true;
	}

	if (!passwordsMatch) {
		confirmPasswordField.classList.add("is-invalid");
		noteNode.textContent = "Las contraseñas no son iguales.";
		return false;
	}

	noteNode.textContent = "";
	return true;
}

function initUsersRegistrationModule(config) {
	var form = document.getElementById(config.formId);
	var messageNode = document.getElementById(config.messageId);
	var documentField = document.getElementById(config.documentFieldId);
	var phoneField = document.getElementById(config.phoneFieldId);
	var roleField = form ? form.elements.role : null;
	var passwordField = form ? form.elements.password : null;
	var confirmPasswordField = form ? form.elements.confirmPassword : null;
	var passwordMatchNote = document.getElementById("user-password-match-message");

	bindDigitsOnlyField(documentField);
	bindDigitsOnlyField(phoneField);

	if (!form) {
		return;
	}

	configureRoleSelect(roleField);

	if (passwordField && confirmPasswordField && passwordMatchNote) {
		passwordField.addEventListener("input", function () {
			updatePasswordMatchState(passwordField, confirmPasswordField, passwordMatchNote);
		});

		confirmPasswordField.addEventListener("input", function () {
			updatePasswordMatchState(passwordField, confirmPasswordField, passwordMatchNote);
		});
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		var passwordsMatch = updatePasswordMatchState(passwordField, confirmPasswordField, passwordMatchNote);

		if (!passwordsMatch) {
			if (messageNode) {
				messageNode.textContent = "Las contraseñas no son iguales.";
			}

			showAlert("Las contraseñas no son iguales.", "error");
			confirmPasswordField.focus();
			return;
		}

		var result = addUser({
			documentNumber: form.elements.documentNumber.value,
			firstName: form.elements.firstName.value,
			lastName: form.elements.lastName.value,
			phone: form.elements.phone.value,
			email: form.elements.email.value,
			password: form.elements.password.value,
			confirmPassword: form.elements.confirmPassword.value,
			role: form.elements.role.value
		});

		if (messageNode) {
			messageNode.textContent = result.message;
		}

		if (result.success) {
			form.reset();
			updatePasswordMatchState(passwordField, confirmPasswordField, passwordMatchNote);
			showAlert(result.message, "success");
		} else {
			showAlert(result.message, "error");
		}
	});
}

function initUsersListModule(config) {
	renderUsersTable(config.tableBodyId);
}

function initUsersModule(config) {
	initUsersRegistrationModule(config);
}

export {
	AVAILABLE_ROLES,
	ROLE_DEFINITIONS,
	USERS_STORAGE_KEY,
	addUser,
	deleteUser,
	initUsersListModule,
	initUsersRegistrationModule,
	initUsersModule,
	loadUsers,
	renderUsersTable,
	saveUsers
};
