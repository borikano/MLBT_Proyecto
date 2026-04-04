import storage from "./storage.js";

const SESSION_KEY = "mlbt_active_session";

const session = {
	startSession: function (userData) {
		if (!userData || typeof userData !== "object") {
			return false;
		}

		var sessionPayload = {
			id: userData.id || "admin-root",
			name: userData.name || "Administrador MLBT",
			email: userData.email || "",
			role: userData.role || "",
			registrationNumber: userData.registrationNumber || "",
			loggedAt: new Date().toISOString()
		};

		return storage.set(SESSION_KEY, sessionPayload);
	},

	endSession: function () {
		return storage.remove(SESSION_KEY);
	},

	isActive: function () {
		var activeSession = storage.get(SESSION_KEY, null);
		return Boolean(activeSession && activeSession.email && activeSession.role);
	},

	getUser: function () {
		return storage.get(SESSION_KEY, null);
	}
};

export { SESSION_KEY };
export default Object.freeze(session);
