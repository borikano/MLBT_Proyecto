import fs from "node:fs"

import {
  describe,
  expect,
  it,
} from "vitest"

describe("UsuariosProvider runtime API", () => {
  it("usa catalogos y API real sin consumir usuariosMock", () => {
    const source = fs.readFileSync(
      "src/features/usuarios/UsuariosProvider.jsx",
      "utf8"
    )

    expect(source).toContain("@/data/catalogs/users.catalog")
    expect(source).toContain("@/services/users.api")
    expect(source).toContain("@/mappers/user.mapper")
    expect(source).not.toContain("@/data/mocks/usuarios.mock")
    expect(source).not.toMatch(/\busuariosMock\b/)
    expect(source).not.toMatch(/Math\.max/)
    expect(source).not.toMatch(/generateRegistrationNumber/)
  })

  it("Dashboard no consume usuarios.mock y usa API de usuarios", () => {
    const source = fs.readFileSync(
      "src/pages/Dashboard.jsx",
      "utf8"
    )

    expect(source).not.toContain("@/data/mocks/usuarios.mock")
    expect(source).toContain("@/services/users.api")
    expect(source).toContain("@/mappers/user.mapper")
  })
})
