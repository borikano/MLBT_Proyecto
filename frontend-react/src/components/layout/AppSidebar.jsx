import { NavLink, useNavigate } from "react-router-dom"

import logoPrincipal from "@/assets/mlbt/brand/logo-principal.png"
import { logoutMock } from "@/lib/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Usuarios",
    url: "/usuarios",
  },
  {
    title: "Inventario",
    url: "/inventario",
  },
  {
    title: "Ventas",
    url: "/ventas",
  },
]

export default function AppSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutMock()
    navigate("/login", { replace: true })
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logoPrincipal}
            alt="Logo María La Bonita Taquería"
            className="h-12 w-12 rounded-full border object-contain"
          />

          <div>
            <p className="text-sm font-bold text-[#7c2d12]">MLBT</p>
            <p className="text-xs text-muted-foreground">
              Panel administrativo
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación principal</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#fff7ed] font-semibold text-[#7c2d12]"
                          : "text-muted-foreground"
                      }
                    >
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md bg-[#7c2d12] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9a3412]"
        >
          Cerrar sesión
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
