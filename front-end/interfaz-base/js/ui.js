function getToastContainer() {
	var container = document.getElementById("toast-container");

	if (!container) {
		container = document.createElement("div");
		container.id = "toast-container";
		container.className = "toast-container";
		document.body.appendChild(container);
	}

	return container;
}

function showAlert(message, type) {
	var normalizedType = type === "error" ? "error" : "success";
	var toast = document.createElement("div");
	var container = getToastContainer();

	toast.className = "toast toast--" + normalizedType;
	toast.setAttribute("role", "status");
	toast.setAttribute("aria-live", "polite");
	toast.textContent = String(message || "Operacion completada.");

	container.appendChild(toast);

	window.setTimeout(function () {
		toast.classList.add("toast--hidden");
		window.setTimeout(function () {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
		}, 220);
	}, 3000);
}

function closeDialogOverlay(overlay) {
	if (overlay && overlay.parentNode) {
		overlay.parentNode.removeChild(overlay);
	}
}

function createDialogBase(options) {
	var overlay = document.createElement("div");
	var dialog = document.createElement("div");
	var title = document.createElement("h3");
	var message = document.createElement("p");
	var actions = document.createElement("div");

	overlay.className = "app-dialog-overlay";
	dialog.className = "app-dialog";
	actions.className = "app-dialog__actions";

	dialog.setAttribute("role", "dialog");
	dialog.setAttribute("aria-modal", "true");

	title.className = "app-dialog__title";
	title.textContent = options.title || "Confirmacion";

	message.className = "app-dialog__message";
	message.textContent = options.message || "Confirma esta accion.";

	dialog.appendChild(title);
	dialog.appendChild(message);
	dialog.appendChild(actions);
	overlay.appendChild(dialog);
	document.body.appendChild(overlay);

	return {
		overlay: overlay,
		dialog: dialog,
		actions: actions
	};
}

function showConfirmDialog(options) {
	return new Promise(function (resolve) {
		var dialogParts = createDialogBase(options || {});
		var cancelButton = document.createElement("button");
		var confirmButton = document.createElement("button");

		cancelButton.type = "button";
		cancelButton.className = "button button--ghost";
		cancelButton.textContent = options && options.cancelText ? options.cancelText : "Cancelar";

		confirmButton.type = "button";
		confirmButton.className = "button button--primary";
		confirmButton.textContent = options && options.confirmText ? options.confirmText : "Aceptar";

		function finish(result) {
			closeDialogOverlay(dialogParts.overlay);
			resolve(result);
		}

		cancelButton.addEventListener("click", function () {
			finish(false);
		});

		confirmButton.addEventListener("click", function () {
			finish(true);
		});

		dialogParts.overlay.addEventListener("click", function (event) {
			if (event.target === dialogParts.overlay) {
				finish(false);
			}
		});

		dialogParts.actions.appendChild(cancelButton);
		dialogParts.actions.appendChild(confirmButton);
		confirmButton.focus();
	});
}

function showPromptDialog(options) {
	return new Promise(function (resolve) {
		var dialogParts = createDialogBase(options || {});
		var input = document.createElement("input");
		var cancelButton = document.createElement("button");
		var confirmButton = document.createElement("button");

		input.className = "auth-form__input app-dialog__input";
		input.type = options && options.inputType ? options.inputType : "text";
		input.autocomplete = "off";
		input.placeholder = options && options.placeholder ? options.placeholder : "";

		cancelButton.type = "button";
		cancelButton.className = "button button--ghost";
		cancelButton.textContent = options && options.cancelText ? options.cancelText : "Cancelar";

		confirmButton.type = "button";
		confirmButton.className = "button button--primary";
		confirmButton.textContent = options && options.confirmText ? options.confirmText : "Confirmar";

		function finish(result) {
			closeDialogOverlay(dialogParts.overlay);
			resolve(result);
		}

		cancelButton.addEventListener("click", function () {
			finish(null);
		});

		confirmButton.addEventListener("click", function () {
			finish(input.value);
		});

		input.addEventListener("keydown", function (event) {
			if (event.key === "Enter") {
				event.preventDefault();
				finish(input.value);
			}

			if (event.key === "Escape") {
				event.preventDefault();
				finish(null);
			}
		});

		dialogParts.overlay.addEventListener("click", function (event) {
			if (event.target === dialogParts.overlay) {
				finish(null);
			}
		});

		dialogParts.dialog.insertBefore(input, dialogParts.actions);
		dialogParts.actions.appendChild(cancelButton);
		dialogParts.actions.appendChild(confirmButton);
		input.focus();
	});
}

function togglePasswordVisibility(toggleButton) {
	var inputId = toggleButton.getAttribute("aria-controls");
	var targetInput = inputId ? document.getElementById(inputId) : null;

	if (!targetInput) {
		return;
	}

	var shouldReveal = targetInput.type === "password";

	targetInput.type = shouldReveal ? "text" : "password";
	toggleButton.setAttribute("aria-pressed", shouldReveal ? "true" : "false");
	toggleButton.setAttribute("aria-label", shouldReveal ? "Ocultar contraseña" : "Mostrar contraseña");
	toggleButton.classList.toggle("is-active", shouldReveal);
}

function initPasswordVisibilityToggles() {
	var toggleButtons = document.querySelectorAll("[data-password-toggle]");

	Array.prototype.forEach.call(toggleButtons, function (toggleButton) {
		toggleButton.addEventListener("click", function () {
			togglePasswordVisibility(toggleButton);
		});
	});
}

function renderEmptyState(tableBodyId, columns, message) {
	var tableBody = document.getElementById(tableBodyId);

	if (!tableBody) {
		return;
	}

	while (tableBody.firstChild) {
		tableBody.removeChild(tableBody.firstChild);
	}

	var row = document.createElement("tr");
	var cell = document.createElement("td");

	cell.colSpan = Number(columns) || 1;
	cell.textContent = message || "No hay registros disponibles";
	row.appendChild(cell);
	tableBody.appendChild(row);
}

export { renderEmptyState, showAlert, showConfirmDialog, showPromptDialog, initPasswordVisibilityToggles };
