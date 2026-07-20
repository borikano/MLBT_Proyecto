import { useState } from "react"

import { UsuariosContext } from "@/features/usuarios/usuariosContext"

import {
  estadosUsuario,
  rolesUsuarios,
  usuariosMock,
} from "@/data/mocks/usuarios.mock"


const initialFormData = {
  role: "ADMIN_TIENDA",
  documentNumber: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  status: "Activo",
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function getRoleData(roleValue) {
  return rolesUsuarios.find((role) => role.value === roleValue)
}

function buildFullName(firstName, lastName) {
  return `${firstName.trim()} ${lastName.trim()}`.trim()
}

function generateRegistrationNumber(users, roleValue) {
  const roleData = getRoleData(roleValue)
  const prefix = roleData?.prefix || "USR"

  const roleUsers = users.filter((user) =>
    user.registrationNumber.startsWith(`${prefix}-`)
  )

  const nextNumber = roleUsers.length + 1

  return `${prefix}-${String(nextNumber).padStart(4, "0")}`
}

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(usuariosMock)
  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState("")
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  const estaEditando = Boolean(usuarioEditandoId)

  const totalUsuarios = usuarios.length
  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.status === "Activo"
  ).length
  const usuariosRetirados = usuarios.filter(
    (usuario) => usuario.status === "Retirado"
  ).length

  const usuariosPendientes = usuarios.filter((usuario) =>
    usuario.status.toLowerCase().includes("pendiente")
  ).length

  const usuariosConAcceso = usuarios.filter((usuario) => usuario.canLogin).length

  const limpiarFormulario = () => {
    setFormData(initialFormData)
    setFormError("")
    setUsuarioEditandoId(null)
  }

  const updateFormField = (name, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (formError) {
      setFormError("")
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    updateFormField(name, value)
  }

  const validarFormulario = () => {
    const documentNumber = formData.documentNumber.trim()
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    const phone = formData.phone.trim()
    const email = formData.email.trim()
    const password = formData.password.trim()
    const confirmPassword = formData.confirmPassword.trim()

    if (!documentNumber || !firstName || !lastName || !phone || !email) {
      return "Completa rol, CC, nombres, apellidos, teléfono y email."
    }

    const documentoDuplicado = usuarios.some(
      (usuario) =>
        usuario.documentNumber === documentNumber &&
        usuario.id !== usuarioEditandoId
    )

    if (documentoDuplicado) {
      return "Ya existe un usuario con ese número de CC."
    }

    const correoDuplicado = usuarios.some(
      (usuario) =>
        usuario.email.toLowerCase() === email.toLowerCase() &&
        usuario.id !== usuarioEditandoId
    )

    if (correoDuplicado) {
      return "Ya existe un usuario con ese email."
    }

    if (!estaEditando && (!password || !confirmPassword)) {
      return "Para crear un usuario debes ingresar y confirmar la contraseña."
    }

    if ((password || confirmPassword) && password !== confirmPassword) {
      return "La contraseña y la confirmación no coinciden."
    }

    if (password && password.length < 6) {
      return "La contraseña debe tener mínimo 6 caracteres."
    }

    return ""
  }

  const guardarUsuario = (event) => {
    event.preventDefault()

    const mensajeError = validarFormulario()

    if (mensajeError) {
      setFormError(mensajeError)
      return false
    }

    const roleData = getRoleData(formData.role)
    const today = getTodayIsoDate()

    const usuarioNormalizado = {
      documentNumber: formData.documentNumber.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      name: buildFullName(formData.firstName, formData.lastName),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      role: formData.role,
      roleLabel: roleData?.label || "Sin rol",
      status: formData.status,
      canLogin: formData.status === "Activo",
      updatedAt: today,
    }

    if (estaEditando) {
      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === usuarioEditandoId
            ? {
                ...usuario,
                ...usuarioNormalizado,
                passwordConfigured:
                  usuario.passwordConfigured || Boolean(formData.password),
              }
            : usuario
        )
      )

      limpiarFormulario()
      return true
    }

    const nuevoId =
      usuarios.length > 0
        ? Math.max(...usuarios.map((usuario) => usuario.id)) + 1
        : 1

    const nuevoUsuario = {
      id: nuevoId,
      registrationNumber: generateRegistrationNumber(usuarios, formData.role),
      ...usuarioNormalizado,
      passwordConfigured: true,
      createdAt: today,
      updatedAt: today,
    }

    setUsuarios((usuariosActuales) => [...usuariosActuales, nuevoUsuario])
    limpiarFormulario()

    return true
  }

  const prepararEdicion = (usuario) => {
    setUsuarioEditandoId(usuario.id)
    setFormData({
      role: usuario.role,
      documentNumber: usuario.documentNumber,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      phone: usuario.phone,
      email: usuario.email,
      password: "",
      confirmPassword: "",
      status: usuario.status,
    })
    setFormError("")
  }

  const abrirConfirmacionBaja = (usuario) => {
    setUsuarioSeleccionado(usuario)
  }

  const cerrarConfirmacionBaja = () => {
    setUsuarioSeleccionado(null)
  }

  const darBajaUsuario = () => {
    if (!usuarioSeleccionado) {
      return
    }

    const today = getTodayIsoDate()

    setUsuarios((usuariosActuales) =>
      usuariosActuales.map((usuario) =>
        usuario.id === usuarioSeleccionado.id
          ? {
              ...usuario,
              status: "Retirado",
              canLogin: false,
              updatedAt: today,
            }
          : usuario
      )
    )

    if (usuarioSeleccionado.id === usuarioEditandoId) {
      limpiarFormulario()
    }

    cerrarConfirmacionBaja()
  }

  const reactivarUsuario = (usuarioSeleccionado) => {
    const today = getTodayIsoDate()

    setUsuarios((usuariosActuales) =>
      usuariosActuales.map((usuario) =>
        usuario.id === usuarioSeleccionado.id
          ? {
              ...usuario,
              status: "Activo",
              canLogin: true,
              updatedAt: today,
            }
          : usuario
      )
    )
  }

  const value = {
    estadosUsuario,
    rolesUsuarios,
    usuarios,
    formData,
    formError,
    estaEditando,
    totalUsuarios,
    usuariosActivos,
    usuariosRetirados,
    usuariosPendientes,
    usuariosConAcceso,
    usuarioSeleccionado,
    limpiarFormulario,
    updateFormField,
    handleChange,
    guardarUsuario,
    prepararEdicion,
    abrirConfirmacionBaja,
    cerrarConfirmacionBaja,
    darBajaUsuario,
    reactivarUsuario,
  }

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  )
}
