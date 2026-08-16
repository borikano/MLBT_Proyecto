import { apiRequest } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"

function requireData(payload, operation) {
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, "data")) {
    throw new Error(`La API no devolvió data para ${operation}.`)
  }

  return payload.data
}

export async function listInventoryApi({ signal } = {}) {
  const payload = await apiRequest("/api/inventory", {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  const data = requireData(payload, "listar inventario")

  if (!Array.isArray(data)) {
    throw new Error("La API devolvió un listado de inventario inválido.")
  }

  return data
}

export async function getInventoryByIdApi(id, { signal } = {}) {
  const payload = await apiRequest(`/api/inventory/${id}`, {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireData(payload, "consultar producto de inventario")
}

export async function createInventoryApi(body) {
  const payload = await apiRequest("/api/inventory", {
    method: "POST",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "crear producto de inventario")
}

export async function updateInventoryApi(id, body) {
  const payload = await apiRequest(`/api/inventory/${id}`, {
    method: "PUT",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "actualizar producto de inventario")
}

export async function deactivateInventoryApi(id) {
  const payload = await apiRequest(`/api/inventory/${id}`, {
    method: "DELETE",
    token: getAuthToken(),
  })

  return requireData(payload, "inactivar producto de inventario")
}

export async function listInventoryMovementsApi({ signal } = {}) {
  const payload = await apiRequest("/api/inventory/movements", {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  const data = requireData(payload, "listar movimientos de inventario")

  if (!Array.isArray(data)) {
    throw new Error("La API devolvió un listado de movimientos inválido.")
  }

  return data
}

export async function getInventoryMovementByIdApi(id, { signal } = {}) {
  const payload = await apiRequest(`/api/inventory/movements/${id}`, {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireData(payload, "consultar movimiento de inventario")
}

export async function createInventoryMovementApi(body) {
  const payload = await apiRequest("/api/inventory/movements", {
    method: "POST",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "registrar movimiento de inventario")
}
