import session from "./session.js";

function setNodeVisibility(node, isVisible, displayMode) {
	if (!node) {
		return;
	}

	node.hidden = !isVisible;
	node.style.display = isVisible ? (displayMode || "") : "none";
}

function resolveRoute(targetFileName) {
	var currentPath = window.location.pathname.replace(/\\/g, "/");
	var insidePagesDirectory = currentPath.indexOf("/pages/") !== -1;

	if (insidePagesDirectory) {
		return targetFileName;
	}

	return "pages/" + targetFileName;
}

function toggleSessionActions() {
	var publicActionGroups = document.querySelectorAll("[data-public-actions]");
	var sessionActionGroups = document.querySelectorAll("[data-session-actions]");
	var sessionNote = document.querySelector("[data-session-note]");
	var hasActiveSession = session.isActive();
	var currentUser = hasActiveSession ? session.getUser() : null;

	publicActionGroups.forEach(function (node) {
		setNodeVisibility(node, !hasActiveSession, "flex");
	});

	sessionActionGroups.forEach(function (node) {
		setNodeVisibility(node, hasActiveSession, "flex");

		var dashboardLink = node.querySelector("a[href]");

		if (dashboardLink) {
			dashboardLink.setAttribute("href", resolveRoute("dashboard.html"));
		}
	});

	if (sessionNote) {
		sessionNote.textContent = hasActiveSession
			? "Sesión activa: " + (currentUser && currentUser.name ? currentUser.name : "Usuario MLBT") + ". Puedes continuar directamente al dashboard."
			: "";
		setNodeVisibility(sessionNote, hasActiveSession, "block");
	}
}

function updateCurrentYear() {
	var yearTarget = document.getElementById("current-year");

	if (yearTarget) {
		yearTarget.textContent = String(new Date().getFullYear());
	}
}

function initApp() {
	document.body.setAttribute("data-app-ready", "true");
	updateCurrentYear();
	toggleSessionActions();
}

document.addEventListener("DOMContentLoaded", initApp);
