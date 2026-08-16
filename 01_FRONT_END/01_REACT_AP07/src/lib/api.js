const DEFAULT_API_URL = "http://localhost:3001"

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/$/, "")

class ApiError extends Error {
  constructor(message, { status = 0, payload = null, url = "" } = {}) {
    super(message)

    this.name = "ApiError"
    this.status = status
    this.payload = payload
    this.url = url
  }
}

async function readJsonResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      `La API respondió con estado HTTP ${response.status}`

    throw new ApiError(message, {
      status: response.status,
      payload,
      url: response.url || "",
    })
  }

  return payload
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body = null, token = "", signal } = options

  const headers = {
    Accept: "application/json",
  }

  if (body !== null) {
    headers["Content-Type"] = "application/json"
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : null,
    signal,
  })

  return readJsonResponse(response)
}

export function isApiError(error, status) {
  if (!(error instanceof ApiError)) {
    return false
  }

  return status === undefined || error.status === status
}

export { API_BASE_URL, ApiError }