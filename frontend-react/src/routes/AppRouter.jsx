import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { logoutMock } from "@/lib/auth"
import Login from "@/pages/Login"
import ProtectedRoute from "@/routes/ProtectedRoute"

function DashboardTemporal() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutMock()
    navigate("/login", { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7ed] px-4">
      <section className="max-w-xl rounded-xl border bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-[#c44f2a]">
          Acceso autorizado
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">
          Dashboard MLBT
        </h1>

        <p className="mt-3 text-muted-foreground">
          Esta vista es temporal. Luego implementaremos el layout administrativo
          con Sidebar, métricas mockeadas y navegación principal.
        </p>

        <Button
          type="button"
          onClick={handleLogout}
          className="mt-6 bg-[#7c2d12] hover:bg-[#9a3412]"
        >
          Cerrar sesión
        </Button>
      </section>
    </main>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardTemporal />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
