import { describe, expect, it } from "vitest"

import {
  calculateNextStock,
  generateMovementNumber,
  generateRegistrationNumber,
} from "@/features/inventario/inventarioLogic"

describe("inventarioLogic", () => {
  it("genera consecutivos de productos y movimientos", () => {
    expect(
      generateRegistrationNumber([
        { registrationNumber: "PRD-0002" },
        { registrationNumber: "PRD-0008" },
      ])
    ).toBe("PRD-0009")

    expect(
      generateMovementNumber([
        { movementNumber: "MOV-0003" },
        { movementNumber: "MOV-0010" },
      ])
    ).toBe("MOV-0011")
  })

  it("calcula entradas, salidas y ajustes sin cambiar la regla existente", () => {
    expect(calculateNextStock(10, "entrada", 2.5)).toBe(12.5)
    expect(calculateNextStock(10, "salida", 2.5)).toBe(7.5)
    expect(calculateNextStock(10, "ajuste", -1.5)).toBe(8.5)
  })
})
