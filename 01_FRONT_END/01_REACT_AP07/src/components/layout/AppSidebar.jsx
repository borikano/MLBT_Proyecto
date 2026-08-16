import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

import logoPrincipal from "@/assets/mlbt/brand/logo-principal.png"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/lib/auth"
import { filterNavigationItems, getSessionRole } from "@/security/authorization"
import { PERMISSIONS } from "@/security/permissions"

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Usuarios",
    to: "/usuarios",
    permission: PERMISSIONS.USERS_READ,
    children: [
      {
        label: "Resumen de usuarios",
        to: "/usuarios/resumen",
        permission: PERMISSIONS.USERS_READ,
      },
      {
        label: "Crear usuario",
        to: "/usuarios/crear",
        permission: PERMISSIONS.USERS_CREATE,
      },
      {
        label: "Data Table de usuarios",
        to: "/usuarios/listado",
        permission: PERMISSIONS.USERS_READ,
      },
    ],
  },
  {
    label: "Inventario",
    to: "/inventario",
    permission: PERMISSIONS.INVENTORY_READ,
    children: [
      {
        label: "Resumen de inventario",
        to: "/inventario/resumen",
        permission: PERMISSIONS.INVENTORY_READ,
      },
      {
        label: "Registrar ítem",
        to: "/inventario/registrar",
        permission: PERMISSIONS.INVENTORY_CREATE,
      },
      {
        label: "Registrar movimiento",
        to: "/inventario/movimientos",
        permission: PERMISSIONS.INVENTORY_MOVE,
      },
      {
        label: "Tablas de inventario",
        to: "/inventario/tablas",
        permission: PERMISSIONS.INVENTORY_READ,
      },
    ],
  },
  {
    label: "Ventas",
    to: "/ventas",
    permission: PERMISSIONS.SALES_READ,
    children: [
      {
        label: "Pedido actual",
        to: "/ventas/pedido",
        permission: PERMISSIONS.SALES_CREATE,
      },
      {
        label: "Historial confirmado",
        to: "/ventas/historial",
        permission: PERMISSIONS.SALES_READ,
      },
      {
        label: "Análisis de ventas",
        to: "/ventas/analisis",
        permission: PERMISSIONS.ANALYTICS_READ,
      },
    ],
  },
]

function isRouteActive(pathname, route) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function getMainLinkClass({ isActive }) {
  return [
    "flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold transition",
    isActive
      ? "border-[#c44f2a] bg-[#fff7ed] text-[#7c2d12] shadow-sm"
      : "border-[#ead8c8] bg-white text-slate-900 hover:border-[#d6a37f] hover:bg-[#fff7ed] hover:text-[#7c2d12]",
  ].join(" ")
}

function getChildLinkClass(pathname, hash, itemTo) {
  const [targetPath, targetHash = ""] = itemTo.split("#")
  const isActive =
    pathname === targetPath && (!targetHash || hash === `#${targetHash}`)

  return [
    "block rounded-lg border px-3 py-2 text-xs transition",
    isActive
      ? "border-[#d6a37f] bg-white font-semibold text-[#7c2d12] shadow-sm"
      : "border-[#f1d4bd] bg-[#fffaf5] text-muted-foreground hover:border-[#d6a37f] hover:bg-white hover:text-[#7c2d12]",
  ].join(" ")
}

export default function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const session = getSession()
  const role = getSessionRole(session)
  const visibleNavigationItems = filterNavigationItems(navigationItems, role)

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  const handleSectionNavigation = (event, target) => {
    const [targetPath, targetHash] = target.split("#")

    if (!targetHash) {
      return
    }

    event.preventDefault()
    navigate(`${targetPath}#${targetHash}`)

    window.setTimeout(() => {
      const section = document.getElementById(targetHash)
      const mainContent = document.getElementById("mlbt-main-content")

      if (!section || !mainContent) {
        return
      }

      const mainTop = mainContent.getBoundingClientRect().top
      const sectionTop = section.getBoundingClientRect().top
      const scrollOffset = sectionTop - mainTop + mainContent.scrollTop - 16

      mainContent.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      })
    }, 120)
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#ead8c8] bg-white">
      <div className="shrink-0 border-b border-[#ead8c8] px-5 py-5">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img
            src={logoPrincipal}
            alt="MLBT"
            className="h-12 w-12 rounded-full border border-[#d6a37f] object-cover shadow-sm"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#7c2d12]">MLBT</p>
            <p className="text-xs text-muted-foreground">
              Panel administrativo
            </p>
          </div>
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-5">
        <p className="px-1 text-xs text-muted-foreground">
          Navegación principal
        </p>

        {visibleNavigationItems.map((item) => {
          const active = isRouteActive(location.pathname, item.to)

          return (
            <div key={item.to} className="space-y-2">
              <NavLink to={item.to} className={getMainLinkClass}>
                <span>{item.label}</span>
              </NavLink>

              {active && item.children?.length > 0 && (
                <div className="ml-3 space-y-2 rounded-xl border border-[#f1d4bd] bg-[#fffaf5] p-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={(event) =>
                        handleSectionNavigation(event, child.to)
                      }
                      className={getChildLinkClass(
                        location.pathname,
                        location.hash,
                        child.to
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-[#ead8c8] p-4">
        <Button
          type="button"
          onClick={handleLogout}
          className="w-full bg-[#7c2d12] hover:bg-[#9a3412]"
        >
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
