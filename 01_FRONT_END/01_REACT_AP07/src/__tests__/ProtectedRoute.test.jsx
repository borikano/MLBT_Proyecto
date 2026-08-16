import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { getSession, isAuthenticated } from "@/lib/auth"
import ProtectedRoute from "@/routes/ProtectedRoute"
import { PERMISSIONS } from "@/security/permissions"

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
  isAuthenticated: vi.fn(),
}))

function renderProtectedRoute({ permission } = {}) {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route element={<ProtectedRoute permission={permission} />}>
          <Route path="/dashboard" element={<h1>Panel privado</h1>} />
        </Route>
        <Route path="/login" element={<h1>Inicio de sesión</h1>} />
        <Route path="/forbidden" element={<h1>Acceso no autorizado</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getSession.mockReturnValue(null)
  })

  it("redirige al login cuando no hay sesión activa", () => {
    isAuthenticated.mockReturnValue(false)
    renderProtectedRoute()
    expect(screen.getByRole("heading", { name: "Inicio de sesión" })).toBeInTheDocument()
  })

  it("renderiza contenido autenticado cuando la ruta no exige permiso", () => {
    isAuthenticated.mockReturnValue(true)
    renderProtectedRoute()
    expect(screen.getByRole("heading", { name: "Panel privado" })).toBeInTheDocument()
  })

  it("permite la ruta cuando el rol tiene el permiso requerido", () => {
    isAuthenticated.mockReturnValue(true)
    getSession.mockReturnValue({ user: { rol: "BODEGA" } })
    renderProtectedRoute({ permission: PERMISSIONS.INVENTORY_MOVE })
    expect(screen.getByRole("heading", { name: "Panel privado" })).toBeInTheDocument()
  })

  it("redirige a forbidden cuando el rol no tiene el permiso requerido", () => {
    isAuthenticated.mockReturnValue(true)
    getSession.mockReturnValue({ user: { rol: "MESERO" } })
    renderProtectedRoute({ permission: PERMISSIONS.INVENTORY_MOVE })
    expect(screen.getByRole("heading", { name: "Acceso no autorizado" })).toBeInTheDocument()
  })
})
