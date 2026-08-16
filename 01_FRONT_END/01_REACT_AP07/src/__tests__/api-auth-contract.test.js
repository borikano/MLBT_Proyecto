import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import {
  ApiError,
  apiRequest,
} from "@/lib/api"

import {
  getJwtExpiresAt,
  getSession,
  handleAuthenticatedApiError,
  login,
} from "@/lib/auth"

function makeResponse({
  ok,
  status,
  payload,
  url = "http://localhost:3001/api/test",
}) {
  return {
    ok,
    status,
    url,
    json: async () => payload,
  }
}

function makeJwt(exp) {
  const payload = globalThis
    .btoa(JSON.stringify({ exp }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return `header.${payload}.signature`
}

describe("contrato HTTP y autenticacion", () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("ApiError conserva status y payload HTTP", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        makeResponse({
          ok: false,
          status: 403,
          payload: {
            ok: false,
            message: "No tiene permisos",
          },
        })
      )
    )

    let capturedError = null

    try {
      await apiRequest("/api/users")
    } catch (error) {
      capturedError = error
    }

    expect(capturedError).toBeInstanceOf(ApiError)
    expect(capturedError.status).toBe(403)
    expect(capturedError.message).toBe("No tiene permisos")
    expect(capturedError.payload).toEqual({
      ok: false,
      message: "No tiene permisos",
    })
  })

  it("apiRequest envia Bearer cuando recibe token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      makeResponse({
        ok: true,
        status: 200,
        payload: { ok: true },
      })
    )

    vi.stubGlobal("fetch", fetchMock)

    await apiRequest("/api/auth/profile", {
      token: "jwt-controlado",
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [, options] = fetchMock.mock.calls[0]

    expect(options.headers.Authorization).toBe(
      "Bearer jwt-controlado"
    )
  })

  it("expiresAt deriva del claim exp del JWT", () => {
    const exp = Math.floor(Date.now() / 1000) + 3600
    const token = makeJwt(exp)

    expect(getJwtExpiresAt(token)).toBe(exp * 1000)
  })

  it("profile 401 impide crear una sesion", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600
    const token = makeJwt(exp)

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        makeResponse({
          ok: true,
          status: 200,
          payload: {
            ok: true,
            token,
            usuario: {
              id: 1,
              username: "admin",
              rol: "ADMIN_APP",
              estado: "ACTIVO",
            },
          },
        })
      )
      .mockResolvedValueOnce(
        makeResponse({
          ok: false,
          status: 401,
          payload: {
            ok: false,
            message: "Sesion invalida o revocada",
          },
        })
      )

    vi.stubGlobal("fetch", fetchMock)

    const result = await login({
      usuario: "admin",
      clave: "password-controlado",
    })

    expect(result.ok).toBe(false)
    expect(result.message).toBe(
      "Sesion invalida o revocada"
    )
    expect(getSession()).toBeNull()
  })

  it("401 elimina sesion y 403 la conserva", () => {
    const session = {
      isAuthenticated: true,
      token: "jwt-controlado",
      expiresAt: Date.now() + 60000,
      user: {
        rol: "ADMIN_APP",
      },
    }

    sessionStorage.setItem(
      "mlbt-auth-session",
      JSON.stringify(session)
    )

    const forbidden = new ApiError(
      "No tiene permisos",
      { status: 403 }
    )

    expect(
      handleAuthenticatedApiError(forbidden)
    ).toBe(false)

    expect(getSession()).not.toBeNull()

    const unauthorized = new ApiError(
      "Sesion revocada",
      { status: 401 }
    )

    expect(
      handleAuthenticatedApiError(unauthorized)
    ).toBe(true)

    expect(getSession()).toBeNull()
  })
})