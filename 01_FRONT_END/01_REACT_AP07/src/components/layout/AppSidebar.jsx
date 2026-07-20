import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

import logoPrincipal from "@/assets/mlbt/brand/logo-principal.png"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Usuarios",
    to: "/usuarios",
    children: [
      {
        label: "Resumen de usuarios",
        to: "/usuarios/resumen",
      },
      {
        label: "Crear usuario",
        to: "/usuarios/crear",
      },
      {
        label: "Data Table de usuarios",
        to: "/usuarios/listado",
      },
    ],
  },
  {
    label: "Inventario",
    to: "/inventario",
    children: [
      {
        label: "Resumen de inventario",
        to: "/inventario#resumen-inventario",
      },
      {
        label: "Registrar ítem",
        to: "/inventario#formulario-inventario",
      },
      {
        label: "Registrar movimiento",
        to: "/inventario#movimiento-inventario",
      },
      {
        label: "Tablas de inventario",
        to: "/inventario#tablas-inventario",
      },
    ],
  },
  {
    label: "Ventas",
    to: "/ventas",
    children: [
      {
        label: "Análisis de ventas",
        to: "/ventas#analisis-ventas",
      },
      {
        label: "Historial confirmado",
        to: "/ventas#historial-ventas",
      },
      {
        label: "Pedido actual",
        to: "/ventas#pedido-actual",
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

        {navigationItems.map((item) => {
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
