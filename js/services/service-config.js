const DATA_PROVIDER = "local";

function getDataProvider() {
	return DATA_PROVIDER;
}

function isLocalProvider() {
	return getDataProvider() === "local";
}

function isRemoteProvider() {
	return getDataProvider() === "remote";
}

export { DATA_PROVIDER, getDataProvider, isLocalProvider, isRemoteProvider };
