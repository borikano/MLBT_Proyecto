const AUTH_STORAGE_KEY = "mlbt-auth-session"

const MOCK_ADMIN_USER = {
  usuario: "admin",
  clave: "admin",
  nombre: "Administrador MLBT",
  rol: "ADMIN",
}

const SESSION_DURATION_MS = 1000 * 60 * 60

function buildMockSession() {
  const issuedAt = Date.now()
  const expiresAt = issuedAt + SESSION_DURATION_MS

  return {
    isAuthenticated: true,
    authenticated: true,
    usuario: MOCK_ADMIN_USER.usuario,
    rol: MOCK_ADMIN_USER.rol,
    user: {
      usuario: MOCK_ADMIN_USER.usuario,
      nombre: MOCK_ADMIN_USER.nombre,
      rol: MOCK_ADMIN_USER.rol,
    },
    issuedAt,
    expiresAt,
  }
}

export function loginMock({ usuario = "", clave = "" } = {}) {
  const usuarioNormalizado = usuario.trim()

  const credentialsAreValid =
    usuarioNormalizado === MOCK_ADMIN_USER.usuario &&
    clave === MOCK_ADMIN_USER.clave

  if (!credentialsAreValid) {
    return {
      ok: false,
      message: "Usuario o contraseña incorrectos.",
    }
  }

  const session = buildMockSession()
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))

  return {
    ok: true,
    session,
  }
}

export function getMockSession() {
  const rawSession = sessionStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    const session = JSON.parse(rawSession)
    const sessionHasExpired = !session.expiresAt || session.expiresAt < Date.now()

    if (!session.isAuthenticated || sessionHasExpired) {
      logoutMock()
      return null
    }

    return session
  } catch {
    logoutMock()
    return null
  }
}

export function isAuthenticatedMock() {
  return Boolean(getMockSession())
}

export function logoutMock() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
