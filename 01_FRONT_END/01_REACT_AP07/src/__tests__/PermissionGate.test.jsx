import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { getSession } from "@/lib/auth"
import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}))

describe("PermissionGate", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("muestra la accion cuando el rol tiene permiso", () => {
    getSession.mockReturnValue({ user: { rol: "ADMIN_TIENDA" } })

    render(
      <PermissionGate permission={PERMISSIONS.USERS_UPDATE}>
        <button type="button">Editar usuario</button>
      </PermissionGate>
    )

    expect(screen.getByRole("button", { name: "Editar usuario" })).toBeInTheDocument()
  })

  it("oculta la accion cuando el rol no tiene permiso", () => {
    getSession.mockReturnValue({ user: { rol: "LECTURA" } })

    render(
      <PermissionGate permission={PERMISSIONS.USERS_UPDATE}>
        <button type="button">Editar usuario</button>
      </PermissionGate>
    )

    expect(screen.queryByRole("button", { name: "Editar usuario" })).not.toBeInTheDocument()
  })

  it("aplica deny-by-default cuando la sesion no tiene rol", () => {
    getSession.mockReturnValue({})

    render(
      <PermissionGate permission={PERMISSIONS.USERS_CREATE}>
        <button type="button">Crear usuario</button>
      </PermissionGate>
    )

    expect(screen.queryByRole("button", { name: "Crear usuario" })).not.toBeInTheDocument()
  })
})
