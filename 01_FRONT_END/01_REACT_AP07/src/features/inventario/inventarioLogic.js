import {
  tiposMovimientoInventario,
} from "@/data/catalogs/inventory.catalog"
function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function generateRegistrationNumber(items) {
  const maxSequence = items.reduce((currentMax, item) => {
    const sequence = Number(
      String(item.registrationNumber || "").replace("PRD-", "")
    )

    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `PRD-${String(maxSequence + 1).padStart(4, "0")}`
}

function generateMovementNumber(movements) {
  const maxSequence = movements.reduce((currentMax, movement) => {
    const sequence = Number(
      String(movement.movementNumber || "").replace("MOV-", "")
    )

    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `MOV-${String(maxSequence + 1).padStart(4, "0")}`
}

function getStockAlert(item) {
  return Number(item.stock) <= Number(item.stockMin)
    ? "Stock bajo"
    : "Stock estable"
}

function getStockAlertClass(item) {
  return Number(item.stock) <= Number(item.stockMin)
    ? "bg-red-50 text-red-700"
    : "bg-green-50 text-green-700"
}

function getStatusClass(status) {
  return status === "Activo"
    ? "bg-green-50 text-green-700"
    : "bg-red-50 text-red-700"
}

function getMovementLabel(tipo) {
  return (
    tiposMovimientoInventario.find((movementType) => movementType.value === tipo)
      ?.label || "Movimiento"
  )
}

function calculateNextStock(currentStock, movementType, quantity) {
  if (movementType === "entrada") {
    return currentStock + quantity
  }

  if (movementType === "salida") {
    return currentStock - quantity
  }

  return currentStock + quantity
}
export {
  calculateNextStock,
  generateMovementNumber,
  generateRegistrationNumber,
  getMovementLabel,
  getStatusClass,
  getStockAlert,
  getStockAlertClass,
  getTodayIsoDate,
}
