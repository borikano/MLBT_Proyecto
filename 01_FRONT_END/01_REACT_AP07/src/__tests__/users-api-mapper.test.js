import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { apiRequest } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"
import {
  createUserApi,
  deactivateUserApi,
  listUsersApi,
  updateUserApi,
} from "@/services/users.api"
import {
  apiStatusToUi,
  buildCreateUserPayload,
  buildUpdateUserPayload,
  mapApiUserToUi,
  uiStatusToApi,
} from "@/mappers/user.mapper"

vi.mock("@/lib/api", () => ({
  apiRequest: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({
  getAuthToken: vi.fn(),
}))

describe("users API y mapper", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAuthToken.mockReturnValue("jwt-controlado")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("mapea contrato publico API al modelo visual", () => {
    const result = mapApiUserToUi({
      id: 7,
      numeroRegistro: "USR-000007",
      documento: "1000000001",
      nombres: "Maria",
      apellidos: "Lopez",
      telefono: "3001234567",
      nombre: "Maria Lopez",
      username: "maria.lopez",
      email: "maria@example.test",
      rol: "ADMIN_TIENDA",
      estado: "ACTIVO",
      createdAt: "2026-08-15T10:00:00.000Z",
      updatedAt: "2026-08-15T11:00:00.000Z",
    })

    expect(result.registrationNumber).toBe("USR-000007")
    expect(result.documentNumber).toBe("1000000001")
    expect(result.firstName).toBe("Maria")
    expect(result.lastName).toBe("Lopez")
    expect(result.username).toBe("maria.lopez")
    expect(result.role).toBe("ADMIN_TIENDA")
    expect(result.roleLabel).toBe("Administrador de tienda")
    expect(result.status).toBe("Activo")
    expect(result.canLogin).toBe(true)
  })

  it("normaliza los cinco estados API y UI", () => {
    expect(apiStatusToUi("ACTIVO")).toBe("Activo")
    expect(apiStatusToUi("PENDIENTE_APROBACION")).toBe(
      "Pendiente de aprobación"
    )
    expect(apiStatusToUi("PENDIENTE_BAJA")).toBe("Pendiente de baja")
    expect(apiStatusToUi("RETIRADO")).toBe("Retirado")
    expect(apiStatusToUi("INACTIVO")).toBe("Inactivo")
    expect(uiStatusToApi("Activo")).toBe("ACTIVO")
    expect(uiStatusToApi("Inactivo")).toBe("INACTIVO")
  })

  it("create payload incluye username y no inventa id ni numeroRegistro", () => {
    const payload = buildCreateUserPayload({
      role: "MESERO",
      status: "Activo",
      documentNumber: "1000000009",
      firstName: "Ana",
      lastName: "Ruiz",
      phone: "3000000000",
      username: "ana.ruiz",
      email: "ana@example.test",
      password: "ClaveSegura123",
    })

    expect(payload.username).toBe("ana.ruiz")
    expect(payload.password).toBe("ClaveSegura123")
    expect(payload.estado).toBe("ACTIVO")
    expect(payload).not.toHaveProperty("id")
    expect(payload).not.toHaveProperty("numeroRegistro")
    expect(payload).not.toHaveProperty("registrationNumber")
  })

  it("update payload omite password vacio y envia motivo sensible", () => {
    const payload = buildUpdateUserPayload(
      {
        role: "CAJERO",
        status: "Inactivo",
        documentNumber: "1000000009",
        firstName: "Ana",
        lastName: "Ruiz",
        phone: "3000000000",
        username: "ana.ruiz",
        email: "ana@example.test",
        password: "",
        motivo: "Cambio autorizado",
      },
      {
        includeReason: true,
      }
    )

    expect(payload.estado).toBe("INACTIVO")
    expect(payload.motivo).toBe("Cambio autorizado")
    expect(payload).not.toHaveProperty("password")
  })

  it("GET /api/users usa Bearer y devuelve data", async () => {
    apiRequest.mockResolvedValue({
      ok: true,
      data: [{ id: 1 }],
    })

    await expect(listUsersApi()).resolves.toEqual([{ id: 1 }])

    expect(apiRequest).toHaveBeenCalledWith(
      "/api/users",
      expect.objectContaining({
        method: "GET",
        token: "jwt-controlado",
      })
    )
  })

  it("POST y PUT delegan payload sin generar identificadores locales", async () => {
    apiRequest
      .mockResolvedValueOnce({
        ok: true,
        data: { id: 10 },
      })
      .mockResolvedValueOnce({
        ok: true,
        data: { id: 10, estado: "ACTIVO" },
      })

    const createBody = {
      username: "nuevo",
      password: "ClaveSegura123",
    }

    const updateBody = {
      estado: "ACTIVO",
      motivo: "Reactivación autorizada",
    }

    await createUserApi(createBody)
    await updateUserApi(10, updateBody)

    expect(apiRequest).toHaveBeenNthCalledWith(
      1,
      "/api/users",
      expect.objectContaining({
        method: "POST",
        token: "jwt-controlado",
        body: createBody,
      })
    )

    expect(apiRequest).toHaveBeenNthCalledWith(
      2,
      "/api/users/10",
      expect.objectContaining({
        method: "PUT",
        token: "jwt-controlado",
        body: updateBody,
      })
    )
  })

  it("DELETE envia motivo obligatorio", async () => {
    apiRequest.mockResolvedValue({
      ok: true,
      data: {
        id: 10,
        estado: "RETIRADO",
      },
    })

    await deactivateUserApi(10, "Retiro autorizado")

    expect(apiRequest).toHaveBeenCalledWith(
      "/api/users/10",
      expect.objectContaining({
        method: "DELETE",
        token: "jwt-controlado",
        body: {
          motivo: "Retiro autorizado",
        },
      })
    )
  })
})
