import { Navigate, Route, Routes } from "react-router-dom"

import AdminLayout from "@/components/layout/AdminLayout"
import Dashboard from "@/pages/Dashboard"
import InventarioModule from "@/pages/inventario/InventarioModule"
import InventarioMovimientosPage from "@/pages/inventario/InventarioMovimientosPage"
import InventarioRegistrarPage from "@/pages/inventario/InventarioRegistrarPage"
import InventarioResumenPage from "@/pages/inventario/InventarioResumenPage"
import InventarioTablasPage from "@/pages/inventario/InventarioTablasPage"
import Login from "@/pages/Login"
import UsuariosCrearPage from "@/pages/usuarios/UsuariosCrearPage"
import UsuariosListadoPage from "@/pages/usuarios/UsuariosListadoPage"
import UsuariosModule from "@/pages/usuarios/UsuariosModule"
import UsuariosResumenPage from "@/pages/usuarios/UsuariosResumenPage"
import Ventas from "@/pages/Ventas"
import ProtectedRoute from "@/routes/ProtectedRoute"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/usuarios" element={<UsuariosModule />}>
            <Route index element={<Navigate to="resumen" replace />} />
            <Route path="resumen" element={<UsuariosResumenPage />} />
            <Route path="crear" element={<UsuariosCrearPage />} />
            <Route path="listado" element={<UsuariosListadoPage />} />
          </Route>

          <Route path="/inventario" element={<InventarioModule />}>
            <Route index element={<Navigate to="resumen" replace />} />
            <Route path="resumen" element={<InventarioResumenPage />} />
            <Route path="registrar" element={<InventarioRegistrarPage />} />
            <Route path="movimientos" element={<InventarioMovimientosPage />} />
            <Route path="tablas" element={<InventarioTablasPage />} />
          </Route>
          <Route path="/ventas" element={<Ventas />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
