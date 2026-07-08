import storage from "../../storage.js";

const USERS_STORAGE_KEY = "mlbt_users";
const USER_AUDIT_STORAGE_KEY = "mlbt_user_audit_log";

function normalizeCollection(collection) {
	return Array.isArray(collection) ? collection : [];
}

function getUsers() {
	return normalizeCollection(storage.get(USERS_STORAGE_KEY, []));
}

function saveUsers(users) {
	return storage.set(USERS_STORAGE_KEY, normalizeCollection(users));
}

function getAuditEntries() {
	return normalizeCollection(storage.get(USER_AUDIT_STORAGE_KEY, []));
}

function saveAuditEntries(entries) {
	return storage.set(USER_AUDIT_STORAGE_KEY, normalizeCollection(entries));
}

export { USER_AUDIT_STORAGE_KEY, USERS_STORAGE_KEY, getAuditEntries, getUsers, saveAuditEntries, saveUsers };
