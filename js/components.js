import { canAccessUsersModule } from "./auth.js";

function createBrandLink(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var brandLink = document.createElement("a");
	var logo = document.createElement("img");
	var titleWrapper = document.createElement("span");
	var title = document.createElement("strong");
	var subtitle = document.createElement("span");

	brandLink.className = "navbar__brand";
	brandLink.href = normalizedOptions.href || "../index.html";
	brandLink.setAttribute("aria-label", normalizedOptions.ariaLabel || "Ir al inicio de MLBT");

	logo.className = "navbar__logo";
	logo.src = normalizedOptions.logoSrc || "../assets/img/Logo_Principal.png";
	logo.alt = normalizedOptions.logoAlt || "Logo de María La Bonita Taquería";

	titleWrapper.className = "navbar__title";
	title.textContent = normalizedOptions.title || "MLBT Project";
	subtitle.textContent = normalizedOptions.subtitle || "María La Bonita Taquería";
	titleWrapper.appendChild(title);
	titleWrapper.appendChild(subtitle);

	brandLink.appendChild(logo);
	brandLink.appendChild(titleWrapper);

	return brandLink;
}

function renderPrivateNavbar(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var mountId = normalizedOptions.mountId || "private-navbar-mount";
	var navbarLabel = normalizedOptions.navbarLabel || "Barra principal privada";
	var mountNode = document.getElementById(mountId);

	if (!mountNode) {
		return null;
	}

	var header = document.createElement("header");
	var actions = document.createElement("div");
	var logoutButton = document.createElement("button");

	header.className = "navbar";
	header.setAttribute("aria-label", navbarLabel);

	actions.className = "navbar__actions";
	logoutButton.className = "button button--primary";
	logoutButton.type = "button";
	logoutButton.id = "logout-button";
	logoutButton.textContent = "Cerrar sesión";

	actions.appendChild(logoutButton);
	header.appendChild(createBrandLink());
	header.appendChild(actions);
	mountNode.replaceWith(header);

	return header;
}

function renderPublicNavbar(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var mountId = normalizedOptions.mountId || "public-navbar-mount";
	var navbarLabel = normalizedOptions.navbarLabel || "Encabezado público";
	var mountNode = document.getElementById(mountId);

	if (!mountNode) {
		return null;
	}

	var header = document.createElement("header");
	var actions = document.createElement("div");

	header.className = "navbar";
	header.setAttribute("aria-label", navbarLabel);
	actions.className = "navbar__actions";
	header.appendChild(createBrandLink({
		href: normalizedOptions.homeHref || "../index.html",
		ariaLabel: normalizedOptions.homeAriaLabel || "Volver al inicio de MLBT",
		title: normalizedOptions.title || "MLBT Project | Maria La Bonita Taqueria",
		subtitle: normalizedOptions.subtitle || "Acceso al sistema",
		logoAlt: normalizedOptions.logoAlt || "Logo de Maria La Bonita Taqueria"
	}));

	if (normalizedOptions.actionLabel && normalizedOptions.actionHref) {
		var actionLink = document.createElement("a");
		actionLink.className = normalizedOptions.actionClassName || "button button--ghost";
		actionLink.href = normalizedOptions.actionHref;
		actionLink.textContent = normalizedOptions.actionLabel;
		actions.appendChild(actionLink);
	}

	header.appendChild(actions);
	mountNode.replaceWith(header);

	return header;
}

function renderPublicHeroIntro(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var mountId = normalizedOptions.mountId || "public-hero-intro-mount";
	var mountNode = document.getElementById(mountId);

	if (!mountNode) {
		return null;
	}

	var section = document.createElement("section");
	var eyebrow = document.createElement("p");
	var title = document.createElement("h1");
	var description = document.createElement("p");

	section.className = normalizedOptions.className || "hero-copy";
	if (normalizedOptions.ariaLabelledBy) {
		section.setAttribute("aria-labelledby", normalizedOptions.ariaLabelledBy);
	}

	eyebrow.className = "eyebrow";
	eyebrow.textContent = normalizedOptions.eyebrow || "MLBT";

	title.id = normalizedOptions.titleId || "public-hero-title";
	title.textContent = normalizedOptions.title || "Panel MLBT";

	description.className = "app-description" + (normalizedOptions.descriptionClassName ? " " + normalizedOptions.descriptionClassName : "");
	description.textContent = normalizedOptions.description || "";

	section.appendChild(eyebrow);
	section.appendChild(title);
	section.appendChild(description);

	if (normalizedOptions.helperText) {
		var helper = document.createElement("p");
		helper.className = "auth-helper-text";
		helper.textContent = normalizedOptions.helperText;
		section.appendChild(helper);
	}

	if (normalizedOptions.infoCardTitle || normalizedOptions.infoCardDescription) {
		var infoCard = document.createElement("div");
		var infoTitle = document.createElement("h2");
		var infoDescription = document.createElement("p");

		infoCard.className = "surface-card hero-info-card hero-info-card--inline";
		infoTitle.textContent = normalizedOptions.infoCardTitle || "Información";
		infoDescription.textContent = normalizedOptions.infoCardDescription || "";
		infoCard.appendChild(infoTitle);
		infoCard.appendChild(infoDescription);
		section.appendChild(infoCard);
	}

	mountNode.replaceWith(section);
	return section;
}

function renderAppFooter(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var mountId = normalizedOptions.mountId || "app-footer-mount";
	var moduleLabel = normalizedOptions.moduleLabel || "MLBT | Panel privado";
	var mountNode = document.getElementById(mountId);

	if (!mountNode) {
		return null;
	}

	var footer = document.createElement("footer");
	var copyright = document.createElement("small");
	var label = document.createElement("small");

	footer.className = "app-footer";
	footer.setAttribute("aria-label", "Pie de página institucional");
	copyright.textContent = "© " + new Date().getFullYear() + " María La Bonita Taquería. Todos los derechos reservados.";
	label.textContent = moduleLabel;

	footer.appendChild(copyright);
	footer.appendChild(label);
	mountNode.replaceWith(footer);

	return footer;
}

function createSidebarItem(label, href, isCurrentPage) {
	var item = document.createElement("li");
	var link = document.createElement("a");

	link.className = "sidebar__link";
	link.href = href;
	link.textContent = label;

	if (isCurrentPage) {
		link.setAttribute("aria-current", "page");
	}

	item.appendChild(link);
	return item;
}

function getSidebarDefinition(currentPage) {
	var isUsersPage = currentPage === "users" || currentPage === "users-list";
	var usersHref = currentPage === "users" ? "users.html" : "users-list.html";

	return [
		{ key: "dashboard", label: "Dashboard", href: "dashboard.html", current: currentPage === "dashboard" },
		{ key: "users", label: "Usuarios", href: usersHref, current: isUsersPage },
		{ key: "inventory", label: "Inventario", href: "inventory.html", current: currentPage === "inventory" },
		{ key: "sales", label: "Ventas", href: "sales.html", current: currentPage === "sales" }
	];
}

function renderPrivateSidebar(options) {
	var normalizedOptions = options && typeof options === "object" ? options : {};
	var mountId = normalizedOptions.mountId || "private-sidebar-mount";
	var currentPage = normalizedOptions.currentPage || "dashboard";
	var currentUser = normalizedOptions.currentUser || null;
	var mountNode = document.getElementById(mountId);

	if (!mountNode) {
		return null;
	}

	var sidebar = document.createElement("aside");
	var header = document.createElement("div");
	var eyebrow = document.createElement("p");
	var title = document.createElement("h2");
	var menu = document.createElement("ul");
	var sidebarItems = getSidebarDefinition(currentPage);

	sidebar.className = "app-sidebar";
	sidebar.setAttribute("aria-label", "Menú lateral de navegación");

	header.className = "sidebar__header";
	eyebrow.textContent = "Panel principal";
	title.textContent = "Operación MLBT";
	header.appendChild(eyebrow);
	header.appendChild(title);

	menu.className = "sidebar__menu";

	sidebarItems.forEach(function (itemDefinition) {
		if (itemDefinition.key === "users" && !canAccessUsersModule(currentUser)) {
			return;
		}

		menu.appendChild(createSidebarItem(itemDefinition.label, itemDefinition.href, itemDefinition.current));
	});

	sidebar.appendChild(header);
	sidebar.appendChild(menu);
	mountNode.replaceWith(sidebar);

	return sidebar;
}

export { renderAppFooter, renderPrivateNavbar, renderPrivateSidebar, renderPublicHeroIntro, renderPublicNavbar };