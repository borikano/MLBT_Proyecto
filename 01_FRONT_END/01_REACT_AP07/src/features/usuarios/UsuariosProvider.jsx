import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"

import { UsuariosContext } from "@/features/usuarios/usuariosContext"
import {
  estadosUsuario,
  rolesUsuarios,
} from "@/data/catalogs/users.catalog"
import {
  buildCreateUserPayload,
  buildUpdateUserPayload,
  mapApiUserToUi,
  mapApiUsersToUi,
} from "@/mappers/user.mapper"
import {
  createUserApi,
  deactivateUserApi,
  listUsersApi,
  updateUserApi,
} from "@/services/users.api"
import {
  handleAuthenticatedApiError,
} from "@/lib/auth"
import {
  isApiError,
} from "@/lib/api"

const initialFormData = {
  role: "ADMIN_TIENDA",
  documentNumber: "",
  firstName: "",
  lastName: "",
  phone: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  status: "Activo",
  motivo: "",
}

function getFunctionalApiError(error, fallbackMessage) {
  if (isApiError(error, 403)) {
    return "No tienes permiso para realizar esta operación."
  }

  if (isApiError(error, 409)) {
    return (
      error.message ||
      "Existe un conflicto con username, email o documento."
    )
  }

  if (isApiError(error, 400) || isApiError(error, 404)) {
    return error.message || fallbackMessage
  }

  if (isApiError(error) && error.status >= 500) {
    return "No fue posible completar la operación. Intenta nuevamente."
  }

  return error?.message || fallbackMessage
}

export function UsuariosProvider({ children }) {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState("")
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [bajaMotivo, setBajaMotivo] = useState("")
  const [usuarioReactivacion, setUsuarioReactivacion] = useState(null)
  const [reactivacionMotivo, setReactivacionMotivo] = useState("")

  const estaEditando = Boolean(usuarioEditandoId)

  const usuarioEditando = useMemo(
    () =>
      usuarios.find((usuario) => usuario.id === usuarioEditandoId) || null,
    [usuarios, usuarioEditandoId]
  )

  const handleApiFailure = useCallback(
    (apiError, fallbackMessage) => {
      if (handleAuthenticatedApiError(apiError)) {
        navigate("/login", { replace: true })
        return "La sesión ya no es válida. Inicia sesión nuevamente."
      }

      return getFunctionalApiError(apiError, fallbackMessage)
    },
    [navigate]
  )

  const cargarUsuarios = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const data = await listUsersApi()
      setUsuarios(mapApiUsersToUi(data))
      return true
    } catch (apiError) {
      setError(
        handleApiFailure(
          apiError,
          "No fue posible cargar los usuarios."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }, [handleApiFailure])

  useEffect(() => {
    let active = true

    listUsersApi()
      .then((data) => {
        if (!active) {
          return
        }

        setUsuarios(mapApiUsersToUi(data))
        setError("")
      })
      .catch((apiError) => {
        if (!active) {
          return
        }

        setError(
          handleApiFailure(
            apiError,
            "No fue posible cargar los usuarios."
          )
        )
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [handleApiFailure])

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
  const usuariosConAcceso = usuarios.filter(
    (usuario) => usuario.canLogin
  ).length

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
    const username = formData.username.trim()
    const email = formData.email.trim()
    const password = formData.password
    const confirmPassword = formData.confirmPassword
    const motivo = formData.motivo.trim()

    if (
      !documentNumber ||
      !firstName ||
      !lastName ||
      !phone ||
      !username ||
      !email
    ) {
      return "Completa rol, CC, nombres, apellidos, teléfono, username y email."
    }

    if (username.length < 3) {
      return "El username debe tener mínimo 3 caracteres."
    }

    const documentoDuplicado = usuarios.some(
      (usuario) =>
        usuario.documentNumber === documentNumber &&
        usuario.id !== usuarioEditandoId
    )

    if (documentoDuplicado) {
      return "Ya existe un usuario con ese número de CC."
    }

    const usernameDuplicado = usuarios.some(
      (usuario) =>
        usuario.username.toLowerCase() === username.toLowerCase() &&
        usuario.id !== usuarioEditandoId
    )

    if (usernameDuplicado) {
      return "Ya existe un usuario con ese username."
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

    if (password && password.length < 8) {
      return "La contraseña debe tener mínimo 8 caracteres."
    }

    if (password && password.length > 120) {
      return "La contraseña no puede superar 120 caracteres."
    }

    if (estaEditando && usuarioEditando) {
      const cambioSensible =
        usuarioEditando.role !== formData.role ||
        usuarioEditando.status !== formData.status

      if (cambioSensible && motivo.length < 3) {
        return "Indica un motivo de mínimo 3 caracteres para cambiar rol o estado."
      }

      if (motivo && motivo.length < 3) {
        return "El motivo debe tener mínimo 3 caracteres."
      }
    }

    return ""
  }

  const guardarUsuario = async (event) => {
    event.preventDefault()

    const mensajeError = validarFormulario()

    if (mensajeError) {
      setFormError(mensajeError)
      return false
    }

    setLoading(true)
    setError("")
    setFormError("")

    try {
      if (estaEditando && usuarioEditando) {
        const cambioSensible =
          usuarioEditando.role !== formData.role ||
          usuarioEditando.status !== formData.status

        const data = await updateUserApi(
          usuarioEditandoId,
          buildUpdateUserPayload(formData, {
            includeReason: cambioSensible,
          })
        )

        const usuarioActualizado = mapApiUserToUi(data)

        setUsuarios((usuariosActuales) =>
          usuariosActuales.map((usuario) =>
            usuario.id === usuarioActualizado.id
              ? usuarioActualizado
              : usuario
          )
        )
      } else {
        const data = await createUserApi(
          buildCreateUserPayload(formData)
        )

        const nuevoUsuario = mapApiUserToUi(data)

        setUsuarios((usuariosActuales) => [
          ...usuariosActuales,
          nuevoUsuario,
        ])
      }

      limpiarFormulario()
      return true
    } catch (apiError) {
      setFormError(
        handleApiFailure(
          apiError,
          estaEditando
            ? "No fue posible actualizar el usuario."
            : "No fue posible crear el usuario."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const prepararEdicion = (usuario) => {
    setUsuarioEditandoId(usuario.id)
    setFormData({
      role: usuario.role,
      documentNumber: usuario.documentNumber,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      phone: usuario.phone,
      username: usuario.username,
      email: usuario.email,
      password: "",
      confirmPassword: "",
      status: usuario.status,
      motivo: "",
    })
    setFormError("")
  }

  const abrirConfirmacionBaja = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setBajaMotivo("")
    setFormError("")
  }

  const cerrarConfirmacionBaja = () => {
    setUsuarioSeleccionado(null)
    setBajaMotivo("")
  }

  const darBajaUsuario = async () => {
    if (!usuarioSeleccionado) {
      return false
    }

    const motivo = bajaMotivo.trim()

    if (motivo.length < 3) {
      setFormError(
        "El motivo de baja es obligatorio y debe tener mínimo 3 caracteres."
      )
      return false
    }

    setLoading(true)
    setError("")
    setFormError("")

    try {
      const data = await deactivateUserApi(
        usuarioSeleccionado.id,
        motivo
      )
      const usuarioActualizado = mapApiUserToUi(data)

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === usuarioActualizado.id
            ? usuarioActualizado
            : usuario
        )
      )

      if (usuarioSeleccionado.id === usuarioEditandoId) {
        limpiarFormulario()
      }

      cerrarConfirmacionBaja()
      return true
    } catch (apiError) {
      setFormError(
        handleApiFailure(
          apiError,
          "No fue posible dar de baja al usuario."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const abrirConfirmacionReactivacion = (usuario) => {
    setUsuarioReactivacion(usuario)
    setReactivacionMotivo("")
    setFormError("")
  }

  const cerrarConfirmacionReactivacion = () => {
    setUsuarioReactivacion(null)
    setReactivacionMotivo("")
  }

  const reactivarUsuario = async () => {
    if (!usuarioReactivacion) {
      return false
    }

    const motivo = reactivacionMotivo.trim()

    if (motivo.length < 3) {
      setFormError(
        "El motivo de reactivación es obligatorio y debe tener mínimo 3 caracteres."
      )
      return false
    }

    setLoading(true)
    setError("")
    setFormError("")

    try {
      const data = await updateUserApi(
        usuarioReactivacion.id,
        {
          estado: "ACTIVO",
          motivo,
        }
      )
      const usuarioActualizado = mapApiUserToUi(data)

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === usuarioActualizado.id
            ? usuarioActualizado
            : usuario
        )
      )

      cerrarConfirmacionReactivacion()
      return true
    } catch (apiError) {
      setFormError(
        handleApiFailure(
          apiError,
          "No fue posible reactivar al usuario."
        )
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    estadosUsuario,
    rolesUsuarios,
    usuarios,
    loading,
    error,
    formData,
    formError,
    estaEditando,
    totalUsuarios,
    usuariosActivos,
    usuariosRetirados,
    usuariosPendientes,
    usuariosConAcceso,
    usuarioSeleccionado,
    bajaMotivo,
    usuarioReactivacion,
    reactivacionMotivo,
    cargarUsuarios,
    limpiarFormulario,
    updateFormField,
    handleChange,
    guardarUsuario,
    prepararEdicion,
    abrirConfirmacionBaja,
    cerrarConfirmacionBaja,
    setBajaMotivo,
    darBajaUsuario,
    abrirConfirmacionReactivacion,
    cerrarConfirmacionReactivacion,
    setReactivacionMotivo,
    reactivarUsuario,
  }

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  )
}
