import { apiRequest, isApiError } from "@/lib/api"

const AUTH_STORAGE_KEY = "mlbt-auth-session"

function decodeJwtPayload(token) {
  const parts = String(token || "").split(".")

  if (parts.length < 2 || !parts[1]) {
    return null
  }

  try {
    const normalized = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")

    const padded = normalized.padEnd(
      Math.ceil(normalized.length / 4) * 4,
      "="
    )

    const binary = globalThis.atob(padded)

    const bytes = Uint8Array.from(
      binary,
      (character) => character.charCodeAt(0)
    )

    const json = new TextDecoder().decode(bytes)

    return JSON.parse(json)
  } catch {
    return null
  }
}

export function getJwtExpiresAt(token) {
  const payload = decodeJwtPayload(token)
  const exp = Number(payload?.exp)

  if (!Number.isFinite(exp) || exp <= 0) {
    return null
  }

  return exp * 1000
}

function buildSession({ token, usuario }) {
  const issuedAt = Date.now()
  const expiresAt = getJwtExpiresAt(token)

  const user = {
    id: usuario?.id,
    usuario: usuario?.username || usuario?.usuario || "",
    username: usuario?.username || usuario?.usuario || "",
    nombre: usuario?.nombre || "Usuario MLBT",
    email: usuario?.email || "",
    rol: usuario?.rol || "LECTURA",
    estado: usuario?.estado || "ACTIVO",
  }

  return {
    isAuthenticated: true,
    authenticated: true,
    token,
    usuario: user.username,
    rol: user.rol,
    user,
    issuedAt,
    expiresAt,
  }
}

export async function login({ usuario = "", clave = "" } = {}) {
  const username = usuario.trim()
  const password = clave

  if (!username || !password) {
    return {
      ok: false,
      message: "Ingresa usuario y contraseña.",
    }
  }

  try {
    const loginResponse = await apiRequest("/api/auth/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    })

    const token = loginResponse?.token

    if (!token) {
      throw new Error("La API no devolvió un token JWT.")
    }

    let usuarioAutenticado = loginResponse.usuario

    try {
      const profileResponse = await apiRequest("/api/auth/profile", {
        method: "GET",
        token,
      })

      if (profileResponse?.usuario) {
        usuarioAutenticado = profileResponse.usuario
      }
    } catch (error) {
      if (isApiError(error, 401)) {
        throw error
      }

      usuarioAutenticado = loginResponse.usuario
    }

    const session = buildSession({
      token,
      usuario: usuarioAutenticado,
    })

    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(session)
    )

    return {
      ok: true,
      session,
    }
  } catch (error) {
    logout()

    return {
      ok: false,
      message:
        error?.message ||
        "No fue posible iniciar sesión. Verifica la API y las credenciales.",
    }
  }
}

export function getSession() {
  const rawSession = sessionStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    const session = JSON.parse(rawSession)

    const sessionHasExpired =
      Number.isFinite(session.expiresAt) &&
      session.expiresAt <= Date.now()

    if (
      !session.isAuthenticated ||
      !session.token ||
      sessionHasExpired
    ) {
      logout()
      return null
    }

    return session
  } catch {
    logout()
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getSession())
}

export function getAuthToken() {
  return getSession()?.token || ""
}

export function logout() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function handleAuthenticatedApiError(error) {
  if (isApiError(error, 401)) {
    logout()
    return true
  }

  return false
}

export const loginMock = login
export const getMockSession = getSession
export const isAuthenticatedMock = isAuthenticated
export const logoutMock = logout