import { getDataProvider } from "./service-config.js";
import {
	getAuditEntries as getLocalAuditEntries,
	getUsers as getLocalUsers,
	saveAuditEntries as saveLocalAuditEntries,
	saveUsers as saveLocalUsers
} from "./local/user-data-service.local.js";
import {
	getAuditEntries as getRemoteAuditEntries,
	getUsers as getRemoteUsers,
	saveAuditEntries as saveRemoteAuditEntries,
	saveUsers as saveRemoteUsers
} from "./remote/user-data-service.remote.js";

function getImplementation() {
	if (getDataProvider() === "remote") {
		return {
			getUsers: getRemoteUsers,
			saveUsers: saveRemoteUsers,
			getAuditEntries: getRemoteAuditEntries,
			saveAuditEntries: saveRemoteAuditEntries
		};
	}

	return {
		getUsers: getLocalUsers,
		saveUsers: saveLocalUsers,
		getAuditEntries: getLocalAuditEntries,
		saveAuditEntries: saveLocalAuditEntries
	};
}

function getUsers() {
	return getImplementation().getUsers();
}

function saveUsers(users) {
	return getImplementation().saveUsers(users);
}

function getAuditEntries() {
	return getImplementation().getAuditEntries();
}

function saveAuditEntries(entries) {
	return getImplementation().saveAuditEntries(entries);
}

export { getAuditEntries, getUsers, saveAuditEntries, saveUsers };
