import { apiRequest } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"

function requireData(payload, operation) {
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, "data")) {
    throw new Error(`La API no devolvió data para ${operation}.`)
  }

  return payload.data
}

export async function listUsersApi({ signal } = {}) {
  const payload = await apiRequest("/api/users", {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  const data = requireData(payload, "listar usuarios")

  if (!Array.isArray(data)) {
    throw new Error("La API devolvió un listado de usuarios inválido.")
  }

  return data
}

export async function getUserByIdApi(id, { signal } = {}) {
  const payload = await apiRequest(`/api/users/${id}`, {
    method: "GET",
    token: getAuthToken(),
    signal,
  })

  return requireData(payload, "consultar usuario")
}

export async function createUserApi(body) {
  const payload = await apiRequest("/api/users", {
    method: "POST",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "crear usuario")
}

export async function updateUserApi(id, body) {
  const payload = await apiRequest(`/api/users/${id}`, {
    method: "PUT",
    token: getAuthToken(),
    body,
  })

  return requireData(payload, "actualizar usuario")
}

export async function deactivateUserApi(id, motivo) {
  const payload = await apiRequest(`/api/users/${id}`, {
    method: "DELETE",
    token: getAuthToken(),
    body: {
      motivo,
    },
  })

  return requireData(payload, "dar de baja usuario")
}
