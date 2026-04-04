import session from "./session.js";
import { getUsers, saveUsers } from "./services/user-data-service.js";
import { sanitizeInput } from "./validators.js";

const ADMIN_CREDENTIALS = Object.freeze({
	email: "admin@mlbt.com",
	password: "admin123",
	role: "Administrador del sistema",
	name: "Administrador MLBT",
	id: "admin-root",
	registrationNumber: "ADM-0001"
});

function normalizeValue(value) {
	return typeof value === "string" ? value.trim() : "";
}

function normalizeUsersCollection(users) {
	return Array.isArray(users) ? users : [];
}

function buildRootAdminUser() {
	return {
		id: ADMIN_CREDENTIALS.id,
		name: ADMIN_CREDENTIALS.name,
		email: ADMIN_CREDENTIALS.email,
		password: ADMIN_CREDENTIALS.password,
		role: ADMIN_CREDENTIALS.role,
		registrationNumber: ADMIN_CREDENTIALS.registrationNumber,
		status: "Activo",
		canLogin: true,
		createdAt: "2026-04-02T00:00:00.000Z"
	};
}

function matchesRootAdmin(user) {
	if (!user || typeof user !== "object") {
		return false;
	}

	return sanitizeInput(user.id) === ADMIN_CREDENTIALS.id || normalizeValue(user.email).toLowerCase() === ADMIN_CREDENTIALS.email;
}

function ensureAuthUsers(users) {
	var normalizedUsers = normalizeUsersCollection(users);
	var hasRootAdmin = normalizedUsers.some(function (user) {
		return matchesRootAdmin(user);
	});

	if (hasRootAdmin) {
		return normalizedUsers;
	}

	var usersWithRootAdmin = [buildRootAdminUser()].concat(normalizedUsers);
	var wasSaved = saveUsers(usersWithRootAdmin);

	return wasSaved ? usersWithRootAdmin : normalizedUsers;
}

function loadStoredUsers() {
	var storedUsers = ensureAuthUsers(getUsers());

	return storedUsers.map(function (user) {
		var normalizedRole = sanitizeInput(user.role);
		var normalizedRegistrationNumber = sanitizeInput(user.registrationNumber) || "";
		var fullName = sanitizeInput(user.name) || [sanitizeInput(user.firstName), sanitizeInput(user.lastName)].filter(Boolean).join(" ").trim() || "Usuario MLBT";

		return {
			id: sanitizeInput(user.id) || "",
			name: fullName,
			email: normalizeValue(user.email).toLowerCase(),
			password: normalizeValue(user.password),
			role: normalizedRole,
			registrationNumber: normalizedRegistrationNumber,
			status: sanitizeInput(user.status) || "Activo",
			canLogin: user.canLogin !== false
		};
	}).filter(function (user) {
		return Boolean(user.email && user.password && user.role);
	});
}

function findUserByCredentials(email, password) {
	var storedUsers = loadStoredUsers();

	return storedUsers.find(function (user) {
		return user.email === email && user.password === password;
	}) || null;
}

function resolveRoute(targetFileName) {
	var currentPath = window.location.pathname.replace(/\\/g, "/");
	var insidePagesDirectory = currentPath.indexOf("/pages/") !== -1;

	if (insidePagesDirectory) {
		return targetFileName;
	}

	return "pages/" + targetFileName;
}

function redirectTo(targetFileName) {
	window.location.href = resolveRoute(targetFileName);
}

function normalizeRoleList(roles) {
	if (!Array.isArray(roles)) {
		return [];
	}

	return roles.map(function (role) {
		return sanitizeInput(role);
	}).filter(Boolean);
}

function canAccessUsersModule(user) {
	var resolvedRole = sanitizeInput(user && user.role);
	return resolvedRole === "Administrador del sistema" || resolvedRole === "Administrador de tienda";
}

function login(email, password) {
	var normalizedEmail = normalizeValue(email).toLowerCase();
	var normalizedPassword = normalizeValue(password);

	if (!normalizedEmail || !normalizedPassword) {
		return {
			success: false,
			message: "Debes ingresar correo y contraseña."
		};
	}

	var matchedUser = findUserByCredentials(normalizedEmail, normalizedPassword);

	if (!matchedUser) {
		return {
			success: false,
			message: "Credenciales inválidas."
		};
	}

	if (matchedUser.canLogin === false || matchedUser.status !== "Activo") {
		return {
			success: false,
			message: "Este usuario no tiene acceso activo al sistema."
		};
	}

	var userData = {
		id: matchedUser.id || ADMIN_CREDENTIALS.id,
		name: matchedUser.name || ADMIN_CREDENTIALS.name,
		email: matchedUser.email,
		role: matchedUser.role,
		registrationNumber: matchedUser.registrationNumber || ADMIN_CREDENTIALS.registrationNumber
	};

	var sessionStarted = session.startSession(userData);

	if (!sessionStarted) {
		return {
			success: false,
			message: "No fue posible iniciar la sesión."
		};
	}

	return {
		success: true,
		message: "Inicio de sesión exitoso.",
		user: userData
	};
}

function logout() {
	session.endSession();
	redirectTo("login.html");
}

function protectRoute(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var allowedRoles = normalizeRoleList(normalizedOptions.allowedRoles);
	var unauthorizedRedirect = sanitizeInput(normalizedOptions.unauthorizedRedirect) || "dashboard.html";

	if (!session.isActive()) {
		redirectTo("login.html");
		return false;
	}

	var activeSessionUser = session.getUser();
	var storedUsers = loadStoredUsers();
	var matchedUser = storedUsers.find(function (user) {
		return sanitizeInput(user.id) === sanitizeInput(activeSessionUser && activeSessionUser.id) || user.email === normalizeValue(activeSessionUser && activeSessionUser.email).toLowerCase();
	});

	if (matchedUser && (matchedUser.canLogin === false || matchedUser.status !== "Activo")) {
		session.endSession();
		redirectTo("login.html");
		return false;
	}

	if (allowedRoles.length > 0) {
		var resolvedRole = sanitizeInput((matchedUser && matchedUser.role) || (activeSessionUser && activeSessionUser.role));
		var hasAccess = allowedRoles.indexOf(resolvedRole) !== -1;

		if (!hasAccess) {
			redirectTo(unauthorizedRedirect);
			return false;
		}
	}

	return true;
}

export { ADMIN_CREDENTIALS, canAccessUsersModule, login, logout, protectRoute };
