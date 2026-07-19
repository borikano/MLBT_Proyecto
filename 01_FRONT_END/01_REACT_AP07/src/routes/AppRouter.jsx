import { Navigate, Route, Routes } from "react-router-dom"

import AdminLayout from "@/components/layout/AdminLayout"
import Dashboard from "@/pages/Dashboard"
import Inventario from "@/pages/Inventario"
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

          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ventas" element={<Ventas />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
