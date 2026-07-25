import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import Login from "@/pages/Login"
import { isAuthenticated, login } from "@/lib/auth"

vi.mock("@/lib/auth", () => ({
  isAuthenticated: vi.fn(),
  login: vi.fn(),
}))

function renderLogin(initialEntries = ["/login"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<h1>Dashboard MLBT</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    isAuthenticated.mockReturnValue(false)
  })

  it("renderiza campos accesibles y boton de envio", () => {
    renderLogin()

    expect(screen.getByLabelText("Usuario")).toBeInTheDocument()
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument()
  })

  it("muestra el error retornado por autenticacion", async () => {
    const user = userEvent.setup()
    login.mockResolvedValue({
      ok: false,
      message: "Credenciales invalidas.",
    })

    renderLogin()

    await user.type(screen.getByLabelText("Usuario"), "adminapp")
    await user.type(screen.getByLabelText("Contraseña"), "clave-incorrecta")
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }))

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Credenciales invalidas."
    )
    expect(screen.getByLabelText("Usuario")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("aria-invalid", "true")
    expect(login).toHaveBeenCalledWith({
      usuario: "adminapp",
      clave: "clave-incorrecta",
    })
  })

  it("navega al dashboard cuando la autenticacion es correcta", async () => {
    const user = userEvent.setup()
    login.mockResolvedValue({ ok: true, session: { token: "token-controlado" } })

    renderLogin()

    await user.type(screen.getByLabelText("Usuario"), "adminapp")
    await user.type(screen.getByLabelText("Contraseña"), "AdminApp123*")
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }))

    expect(await screen.findByRole("heading", { name: "Dashboard MLBT" })).toBeInTheDocument()
  })

  it("redirige al dashboard si ya existe sesion activa", async () => {
    isAuthenticated.mockReturnValue(true)

    renderLogin()

    expect(await screen.findByRole("heading", { name: "Dashboard MLBT" })).toBeInTheDocument()
  })
})
