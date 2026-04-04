const storageAPI = {
	set: function (key, value) {
		if (!key || typeof key !== "string") {
			return false;
		}

		try {
			var serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
			return true;
		} catch (error) {
			console.error("MLBT storage.set error:", error);
			return false;
		}
	},

	get: function (key, fallbackValue) {
		if (!key || typeof key !== "string") {
			return fallbackValue === undefined ? null : fallbackValue;
		}

		try {
			var storedValue = localStorage.getItem(key);

			if (storedValue === null) {
				return fallbackValue === undefined ? null : fallbackValue;
			}

			return JSON.parse(storedValue);
		} catch (error) {
			console.error("MLBT storage.get error:", error);
			return fallbackValue === undefined ? null : fallbackValue;
		}
	},

	remove: function (key) {
		if (!key || typeof key !== "string") {
			return false;
		}

		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error("MLBT storage.remove error:", error);
			return false;
		}
	},

	clear: function () {
		try {
			localStorage.clear();
			return true;
		} catch (error) {
			console.error("MLBT storage.clear error:", error);
			return false;
		}
	}
};

export default Object.freeze(storageAPI);
