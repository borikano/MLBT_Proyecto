import { rolesUsuarios } from "@/data/catalogs/users.catalog"

const API_TO_UI_STATUS = Object.freeze({
  ACTIVO: "Activo",
  PENDIENTE_APROBACION: "Pendiente de aprobación",
  PENDIENTE_BAJA: "Pendiente de baja",
  RETIRADO: "Retirado",
  INACTIVO: "Inactivo",
})

const UI_TO_API_STATUS = Object.freeze(
  Object.fromEntries(
    Object.entries(API_TO_UI_STATUS).map(([apiStatus, uiStatus]) => [
      uiStatus,
      apiStatus,
    ])
  )
)

function getRoleLabel(roleValue) {
  return (
    rolesUsuarios.find((role) => role.value === roleValue)?.label ||
    roleValue ||
    "Sin rol"
  )
}

export function apiStatusToUi(status) {
  return API_TO_UI_STATUS[status] || status || "Inactivo"
}

export function uiStatusToApi(status) {
  return UI_TO_API_STATUS[status] || status
}

export function mapApiUserToUi(usuario = {}) {
  return {
    id: usuario.id,
    registrationNumber: usuario.numeroRegistro ?? "",
    documentNumber: usuario.documento ?? "",
    firstName: usuario.nombres ?? "",
    lastName: usuario.apellidos ?? "",
    phone: usuario.telefono ?? "",
    name:
      usuario.nombre ||
      `${usuario.nombres || ""} ${usuario.apellidos || ""}`.trim(),
    username: usuario.username ?? "",
    email: usuario.email ?? "",
    role: usuario.rol ?? "",
    roleLabel: getRoleLabel(usuario.rol),
    status: apiStatusToUi(usuario.estado),
    canLogin: usuario.estado === "ACTIVO",
    createdAt: usuario.createdAt ?? "",
    updatedAt: usuario.updatedAt ?? "",
  }
}

export function mapApiUsersToUi(usuarios = []) {
  return usuarios.map(mapApiUserToUi)
}

export function buildCreateUserPayload(formData) {
  return {
    documento: formData.documentNumber.trim(),
    nombres: formData.firstName.trim(),
    apellidos: formData.lastName.trim(),
    telefono: formData.phone.trim(),
    username: formData.username.trim(),
    email: formData.email.trim() || null,
    password: formData.password,
    rol: formData.role,
    estado: uiStatusToApi(formData.status),
  }
}

export function buildUpdateUserPayload(formData, { includeReason = false } = {}) {
  const payload = {
    documento: formData.documentNumber.trim(),
    nombres: formData.firstName.trim(),
    apellidos: formData.lastName.trim(),
    telefono: formData.phone.trim(),
    username: formData.username.trim(),
    email: formData.email.trim() || null,
    rol: formData.role,
    estado: uiStatusToApi(formData.status),
  }

  if (formData.password) {
    payload.password = formData.password
  }

  const motivo = formData.motivo?.trim()

  if (includeReason || motivo) {
    payload.motivo = motivo
  }

  return payload
}

export {
  API_TO_UI_STATUS,
  UI_TO_API_STATUS,
}
