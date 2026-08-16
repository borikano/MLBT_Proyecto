import { apiRequest } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"

function requireData(payload, operation) {
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, "data")) {
    throw new Error(`La API no devolvió data para ${operation}.`)
  }

  return payload.data
}

function requireListData(payload, operation) {
  const data = requireData(payload, operation)

  if (!Array.isArray(data)) {
    throw new Error(`La API devolvió un listado inválido para ${operation}.`)
  }

  return data
}

export async function listSaleProductsApi({ signal } = {}) {
  const payload = await apiRequest("/api/sales/products", {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireListData(payload, "listar productos de venta")
}

export async function getSaleProductByIdApi(id, { signal } = {}) {
  const payload = await apiRequest(`/api/sales/products/${id}`, {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireData(payload, "consultar producto de venta")
}

export async function createSaleProductApi(body) {
  const payload = await apiRequest("/api/sales/products", {
    method: "POST",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "crear producto de venta")
}

export async function updateSaleProductApi(id, body) {
  const payload = await apiRequest(`/api/sales/products/${id}`, {
    method: "PUT",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "actualizar producto de venta")
}

export async function deactivateSaleProductApi(id) {
  const payload = await apiRequest(`/api/sales/products/${id}`, {
    method: "DELETE",
    token: getAuthToken(),
  })

  return requireData(payload, "inactivar producto de venta")
}

export async function listSalesApi({ signal } = {}) {
  const payload = await apiRequest("/api/sales", {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireListData(payload, "listar ventas")
}

export async function getSaleByIdApi(id, { signal } = {}) {
  const payload = await apiRequest(`/api/sales/${id}`, {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireData(payload, "consultar venta")
}

export async function createSaleApi(body) {
  const payload = await apiRequest("/api/sales", {
    method: "POST",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "crear venta")
}

export async function updateSaleApi(id, body) {
  const payload = await apiRequest(`/api/sales/${id}`, {
    method: "PUT",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "actualizar venta")
}

export async function cancelSaleApi(id, motivo) {
  const payload = await apiRequest(`/api/sales/${id}`, {
    method: "DELETE",
    token: getAuthToken(),
    body: {
      motivo: String(motivo || "").trim(),
    },
  })

  return requireData(payload, "anular venta")
}