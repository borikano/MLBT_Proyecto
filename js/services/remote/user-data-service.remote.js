function notConfigured() {
	throw new Error("El proveedor remoto de datos aun no esta configurado.");
}

function getUsers() {
	return notConfigured();
}

function saveUsers() {
	return notConfigured();
}

function getAuditEntries() {
	return notConfigured();
}

function saveAuditEntries() {
	return notConfigured();
}

export { getAuditEntries, getUsers, saveAuditEntries, saveUsers };
