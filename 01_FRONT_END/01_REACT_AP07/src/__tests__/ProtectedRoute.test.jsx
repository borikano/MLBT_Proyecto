import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import ProtectedRoute from "@/routes/ProtectedRoute"
import { isAuthenticated } from "@/lib/auth"

vi.mock("@/lib/auth", () => ({
  isAuthenticated: vi.fn(),
}))

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<h1>Panel privado</h1>} />
        </Route>
        <Route path="/login" element={<h1>Inicio de sesion</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("redirige al login cuando no hay sesion activa", () => {
    isAuthenticated.mockReturnValue(false)

    renderProtectedRoute()

    expect(screen.getByRole("heading", { name: "Inicio de sesion" })).toBeInTheDocument()
  })

  it("renderiza el contenido privado cuando hay sesion activa", () => {
    isAuthenticated.mockReturnValue(true)

    renderProtectedRoute()

    expect(screen.getByRole("heading", { name: "Panel privado" })).toBeInTheDocument()
  })
})
