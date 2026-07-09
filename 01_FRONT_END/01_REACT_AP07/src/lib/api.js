const DEFAULT_API_URL = "http://localhost:3001"

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/$/, "")

async function readJsonResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      `La API respondió con estado HTTP ${response.status}`

    throw new Error(message)
  }

  return payload
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body = null, token = "" } = options

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
  })

  return readJsonResponse(response)
}

export { API_BASE_URL }
