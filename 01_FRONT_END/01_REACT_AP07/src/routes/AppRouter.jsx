import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import Login from "@/pages/Login"
import ProtectedRoute from "@/routes/ProtectedRoute"
import { PERMISSIONS } from "@/security/permissions"

const AdminLayout = lazy(() => import("@/components/layout/AdminLayout"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Forbidden = lazy(() => import("@/pages/Forbidden"))
const InventarioModule = lazy(() => import("@/pages/inventario/InventarioModule"))
const InventarioMovimientosPage = lazy(
  () => import("@/pages/inventario/InventarioMovimientosPage")
)
const InventarioRegistrarPage = lazy(
  () => import("@/pages/inventario/InventarioRegistrarPage")
)
const InventarioResumenPage = lazy(
  () => import("@/pages/inventario/InventarioResumenPage")
)
const InventarioTablasPage = lazy(
  () => import("@/pages/inventario/InventarioTablasPage")
)
const UsuariosCrearPage = lazy(() => import("@/pages/usuarios/UsuariosCrearPage"))
const UsuariosListadoPage = lazy(
  () => import("@/pages/usuarios/UsuariosListadoPage")
)
const UsuariosModule = lazy(() => import("@/pages/usuarios/UsuariosModule"))
const UsuariosResumenPage = lazy(
  () => import("@/pages/usuarios/UsuariosResumenPage")
)
const VentasModule = lazy(() => import("@/pages/ventas/VentasModule"))
const VentasAnalisisPage = lazy(() => import("@/pages/ventas/VentasAnalisisPage"))
const VentasHistorialPage = lazy(() => import("@/pages/ventas/VentasHistorialPage"))
const VentasPedidoPage = lazy(() => import("@/pages/ventas/VentasPedidoPage"))

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7ed] text-sm text-[#7c2d12]">
      Cargando módulo...
    </div>
  )
}

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/forbidden" element={<Forbidden />} />

          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<ProtectedRoute permission={PERMISSIONS.USERS_READ} />}>
              <Route path="/usuarios" element={<UsuariosModule />}>
                <Route index element={<Navigate to="resumen" replace />} />
                <Route path="resumen" element={<UsuariosResumenPage />} />
                <Route element={<ProtectedRoute permission={PERMISSIONS.USERS_CREATE} />}>
                  <Route path="crear" element={<UsuariosCrearPage />} />
                </Route>
                <Route path="listado" element={<UsuariosListadoPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute permission={PERMISSIONS.INVENTORY_READ} />}>
              <Route path="/inventario" element={<InventarioModule />}>
                <Route index element={<Navigate to="resumen" replace />} />
                <Route path="resumen" element={<InventarioResumenPage />} />
                <Route element={<ProtectedRoute permission={PERMISSIONS.INVENTORY_CREATE} />}>
                  <Route path="registrar" element={<InventarioRegistrarPage />} />
                </Route>
                <Route element={<ProtectedRoute permission={PERMISSIONS.INVENTORY_MOVE} />}>
                  <Route path="movimientos" element={<InventarioMovimientosPage />} />
                </Route>
                <Route path="tablas" element={<InventarioTablasPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute permission={PERMISSIONS.SALES_READ} />}>
              <Route path="/ventas" element={<VentasModule />}>
                <Route index element={<Navigate to="historial" replace />} />
                <Route element={<ProtectedRoute permission={PERMISSIONS.SALES_CREATE} />}>
                  <Route path="pedido" element={<VentasPedidoPage />} />
                </Route>
                <Route path="historial" element={<VentasHistorialPage />} />
                <Route element={<ProtectedRoute permission={PERMISSIONS.ANALYTICS_READ} />}>
                  <Route path="analisis" element={<VentasAnalisisPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}
