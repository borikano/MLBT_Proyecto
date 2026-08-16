import fs from "node:fs"

import {
  describe,
  expect,
  it,
} from "vitest"

describe("retiro de contexto legacy", () => {
  it("App monta AppRouter directamente dentro de BrowserRouter", () => {
    const app = fs.readFileSync("src/App.jsx", "utf8")

    expect(app).toContain("<BrowserRouter>")
    expect(app).toContain("<AppRouter />")
    expect(app).not.toContain("MlbtDataProvider")
    expect(app).not.toContain("MlbtDataContext")
  })

  it("MlbtDataContext fue retirado fisicamente", () => {
    expect(fs.existsSync("src/context/MlbtDataContext.jsx")).toBe(false)
  })

  it("providers funcionales de modulos permanecen", () => {
    const usuarios = fs.readFileSync(
      "src/pages/usuarios/UsuariosModule.jsx",
      "utf8"
    )
    const inventario = fs.readFileSync(
      "src/pages/inventario/InventarioModule.jsx",
      "utf8"
    )
    const ventas = fs.readFileSync(
      "src/pages/ventas/VentasModule.jsx",
      "utf8"
    )

    expect(usuarios).toContain("<UsuariosProvider>")
    expect(inventario).toContain("<InventarioProvider>")
    expect(ventas).toContain("<VentasProvider>")
  })

  it("RBAC estructural permanece con PermissionGate y ProtectedRoute", () => {
    const permissionGate = fs.readFileSync(
      "src/components/auth/PermissionGate.jsx",
      "utf8"
    )
    const protectedRoute = fs.readFileSync(
      "src/routes/ProtectedRoute.jsx",
      "utf8"
    )

    expect(permissionGate).toContain("hasSessionPermission")
    expect(protectedRoute).toContain("hasSessionPermission")
    expect(protectedRoute).toContain('Navigate to="/forbidden"')
  })
})