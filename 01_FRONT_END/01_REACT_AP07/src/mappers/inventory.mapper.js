import { tiposMovimientoInventario } from "@/data/catalogs/inventory.catalog"

const API_TO_UI_STATUS = Object.freeze({
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
})

const UI_TO_API_STATUS = Object.freeze({
  Activo: "ACTIVO",
  Inactivo: "INACTIVO",
})

const API_TO_UI_MOVEMENT = Object.freeze({
  ENTRADA: "entrada",
  SALIDA: "salida",
  AJUSTE: "ajuste",
})

const UI_TO_API_MOVEMENT = Object.freeze({
  entrada: "ENTRADA",
  salida: "SALIDA",
  ajuste: "AJUSTE",
})

function movementLabel(type) {
  return (
    tiposMovimientoInventario.find((movement) => movement.value === type)
      ?.label || type || "Movimiento"
  )
}

export function apiInventoryStatusToUi(status) {
  return API_TO_UI_STATUS[status] || status || "Inactivo"
}

export function uiInventoryStatusToApi(status) {
  return UI_TO_API_STATUS[status] || status
}

export function apiMovementTypeToUi(type) {
  return API_TO_UI_MOVEMENT[type] || String(type || "").toLowerCase()
}

export function uiMovementTypeToApi(type) {
  return UI_TO_API_MOVEMENT[type] || String(type || "").toUpperCase()
}

export function mapApiInventoryToUi(producto = {}) {
  return {
    id: producto.id,
    registrationNumber: producto.numeroRegistro ?? "",
    nombre: producto.nombre ?? "",
    descripcion: producto.descripcion ?? "",
    categoria: producto.categoria ?? "",
    unidad: producto.unidad ?? "",
    stock: Number(producto.stock ?? 0),
    stockMin: Number(producto.stockMin ?? 0),
    estado: apiInventoryStatusToUi(producto.estado),
    createdAt: producto.createdAt ?? "",
    updatedAt: producto.updatedAt ?? "",
  }
}

export function mapApiInventoryListToUi(productos = []) {
  return productos.map(mapApiInventoryToUi)
}

export function mapApiInventoryMovementToUi(movimiento = {}) {
  const tipo = apiMovementTypeToUi(movimiento.tipo)

  return {
    id: movimiento.id,
    movementNumber: movimiento.numeroMovimiento ?? "",
    itemId: movimiento.productoId,
    itemRegistrationNumber: movimiento.producto?.numeroRegistro ?? "",
    itemName: movimiento.producto?.nombre ?? "",
    itemUnit: movimiento.producto?.unidad ?? "",
    tipo,
    tipoLabel: movementLabel(tipo),
    cantidad: Number(movimiento.cantidad ?? 0),
    stockAnterior: Number(movimiento.stockAnterior ?? 0),
    stockNuevo: Number(movimiento.stockNuevo ?? 0),
    motivo: movimiento.motivo ?? "",
    fecha: movimiento.createdAt
      ? String(movimiento.createdAt).slice(0, 10)
      : "",
    createdAt: movimiento.createdAt ?? "",
    usuarioId: movimiento.usuarioId ?? movimiento.usuario?.id ?? null,
    usuarioNombre:
      movimiento.usuario?.nombre ||
      movimiento.usuario?.username ||
      "",
  }
}

export function mapApiInventoryMovementsToUi(movimientos = []) {
  return movimientos.map(mapApiInventoryMovementToUi)
}

export function buildCreateInventoryPayload(formData) {
  return {
    nombre: formData.nombre.trim(),
    categoria: formData.categoria.trim(),
    unidad: formData.unidad.trim(),
    stock: Number(formData.stock),
    stockMin: Number(formData.stockMin),
    estado: uiInventoryStatusToApi(formData.estado),
  }
}

export function buildUpdateInventoryPayload(formData) {
  return {
    nombre: formData.nombre.trim(),
    categoria: formData.categoria.trim(),
    unidad: formData.unidad.trim(),
    stockMin: Number(formData.stockMin),
    estado: uiInventoryStatusToApi(formData.estado),
  }
}

export function buildInventoryMovementPayload(formData) {
  return {
    productoId: Number(formData.itemId),
    tipo: uiMovementTypeToApi(formData.tipo),
    cantidad: Number(formData.cantidad),
    motivo: formData.motivo.trim(),
  }
}

export {
  API_TO_UI_MOVEMENT,
  API_TO_UI_STATUS,
  UI_TO_API_MOVEMENT,
  UI_TO_API_STATUS,
}
