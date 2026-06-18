import { Navigate, Route, Routes } from "react-router-dom"

import Login from "@/pages/Login"

function DashboardTemporal() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7ed] px-4">
      <section className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-[#c44f2a]">
          Acceso autorizado
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">
          Dashboard MLBT
        </h1>
        <p className="mt-3 text-muted-foreground">
          Esta vista es temporal. Luego implementaremos el layout administrativo con Sidebar.
        </p>
      </section>
    </main>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardTemporal />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
