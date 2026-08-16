import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { apiRequest } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"
import {
  createInventoryApi,
  createInventoryMovementApi,
  deactivateInventoryApi,
  listInventoryApi,
  listInventoryMovementsApi,
  updateInventoryApi,
} from "@/services/inventory.api"
import {
  buildCreateInventoryPayload,
  buildInventoryMovementPayload,
  buildUpdateInventoryPayload,
  mapApiInventoryMovementToUi,
  mapApiInventoryToUi,
} from "@/mappers/inventory.mapper"

vi.mock("@/lib/api", () => ({
  apiRequest: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({
  getAuthToken: vi.fn(),
}))

describe("inventory API y mapper", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAuthToken.mockReturnValue("jwt-controlado")
  })

  it("mapea producto API al contrato visual", () => {
    const result = mapApiInventoryToUi({
      id: 7,
      numeroRegistro: "PRD-000007",
      nombre: "Carne al pastor",
      categoria: "Proteínas",
      unidad: "kg",
      stock: "22",
      stockMin: "6",
      estado: "ACTIVO",
      createdAt: "2026-08-15T10:00:00.000Z",
      updatedAt: "2026-08-15T11:00:00.000Z",
    })

    expect(result.registrationNumber).toBe("PRD-000007")
    expect(result.stock).toBe(22)
    expect(result.stockMin).toBe(6)
    expect(result.estado).toBe("Activo")
  })

  it("mapea movimiento API incluyendo producto y stock final", () => {
    const result = mapApiInventoryMovementToUi({
      id: 12,
      numeroMovimiento: "MOV-000012",
      productoId: 7,
      tipo: "AJUSTE",
      cantidad: "-1.5",
      stockAnterior: "10",
      stockNuevo: "8.5",
      motivo: "Merma controlada",
      createdAt: "2026-08-15T12:00:00.000Z",
      producto: {
        numeroRegistro: "PRD-000007",
        nombre: "Carne al pastor",
        unidad: "kg",
      },
    })

    expect(result.movementNumber).toBe("MOV-000012")
    expect(result.itemId).toBe(7)
    expect(result.tipo).toBe("ajuste")
    expect(result.tipoLabel).toBe("Ajuste")
    expect(result.stockNuevo).toBe(8.5)
  })

  it("create payload no inventa id ni numeroRegistro", () => {
    const payload = buildCreateInventoryPayload({
      nombre: "Tortilla",
      categoria: "Tortillas",
      unidad: "unidad",
      stock: "100",
      stockMin: "20",
      estado: "Activo",
    })

    expect(payload.stock).toBe(100)
    expect(payload.estado).toBe("ACTIVO")
    expect(payload).not.toHaveProperty("id")
    expect(payload).not.toHaveProperty("numeroRegistro")
    expect(payload).not.toHaveProperty("registrationNumber")
  })

  it("update payload no modifica stock operativo", () => {
    const payload = buildUpdateInventoryPayload({
      nombre: "Tortilla",
      categoria: "Tortillas",
      unidad: "unidad",
      stock: "999",
      stockMin: "20",
      estado: "Activo",
    })

    expect(payload.stockMin).toBe(20)
    expect(payload).not.toHaveProperty("stock")
  })

  it("movement payload usa contrato backend y motivo", () => {
    const payload = buildInventoryMovementPayload({
      itemId: "7",
      tipo: "salida",
      cantidad: "2.5",
      motivo: "Consumo controlado",
    })

    expect(payload).toEqual({
      productoId: 7,
      tipo: "SALIDA",
      cantidad: 2.5,
      motivo: "Consumo controlado",
    })
  })

  it("GET de productos y movimientos usa Bearer", async () => {
    apiRequest
      .mockResolvedValueOnce({
        ok: true,
        data: [{ id: 1 }],
      })
      .mockResolvedValueOnce({
        ok: true,
        data: [{ id: 2 }],
      })

    await listInventoryApi()
    await listInventoryMovementsApi()

    expect(apiRequest).toHaveBeenNthCalledWith(
      1,
      "/api/inventory",
      expect.objectContaining({
        method: "GET",
        token: "jwt-controlado",
      })
    )

    expect(apiRequest).toHaveBeenNthCalledWith(
      2,
      "/api/inventory/movements",
      expect.objectContaining({
        method: "GET",
        token: "jwt-controlado",
      })
    )
  })

  it("POST PUT DELETE y movimiento delegan a endpoints reales", async () => {
    apiRequest.mockResolvedValue({
      ok: true,
      data: { id: 1 },
    })

    await createInventoryApi({ nombre: "Nuevo" })
    await updateInventoryApi(1, { estado: "ACTIVO" })
    await deactivateInventoryApi(1)
    await createInventoryMovementApi({
      productoId: 1,
      tipo: "ENTRADA",
      cantidad: 1,
      motivo: "Compra",
    })

    expect(apiRequest).toHaveBeenNthCalledWith(
      1,
      "/api/inventory",
      expect.objectContaining({
        method: "POST",
      })
    )
    expect(apiRequest).toHaveBeenNthCalledWith(
      2,
      "/api/inventory/1",
      expect.objectContaining({
        method: "PUT",
      })
    )
    expect(apiRequest).toHaveBeenNthCalledWith(
      3,
      "/api/inventory/1",
      expect.objectContaining({
        method: "DELETE",
      })
    )
    expect(apiRequest).toHaveBeenNthCalledWith(
      4,
      "/api/inventory/movements",
      expect.objectContaining({
        method: "POST",
      })
    )
  })
})
