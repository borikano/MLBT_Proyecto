import { useMemo, useState } from "react"

import DataTable from "@/components/shared/DataTable"
import {
  estadosUsuario,
  rolesUsuarios,
  usuariosMock,
} from "@/data/mocks/usuarios.mock"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

function formatBoolean(value) {
  return value ? "Sí" : "No"
}

function getStatusClass(status) {
  if (status === "Activo") {
    return "bg-green-50 text-green-700"
  }

  if (status === "Retirado") {
    return "bg-red-50 text-red-700"
  }

  return "bg-orange-50 text-orange-700"
}

export default function Usuarios() {
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
      return "La contraseña mock debe tener mínimo 6 caracteres."
    }

    return ""
  }

  const guardarUsuario = (event) => {
    event.preventDefault()

    const mensajeError = validarFormulario()

    if (mensajeError) {
      setFormError(mensajeError)
      return
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
      return
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
  }

  const editarUsuario = (usuario) => {
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
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "registrationNumber",
        header: "Registro",
        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.registrationNumber}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Usuario",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
            <p className="text-xs text-muted-foreground">
              Tel: {row.original.phone}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "documentNumber",
        header: "Documento",
      },
      {
        accessorKey: "roleLabel",
        header: "Rol",
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
              row.original.status
            )}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "canLogin",
        header: "Acceso",
        cell: ({ row }) => formatBoolean(row.original.canLogin),
      },
      {
        id: "fechas",
        header: "Fechas",
        cell: ({ row }) => (
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Alta: {row.original.createdAt}</p>
            <p>Act: {row.original.updatedAt}</p>
          </div>
        ),
      },
      {
        id: "acciones",
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
          const usuario = row.original

          return (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editarUsuario(usuario)}
              >
                Editar
              </Button>

              {usuario.status === "Retirado" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                  onClick={() => reactivarUsuario(usuario)}
                >
                  Reactivar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={() => abrirConfirmacionBaja(usuario)}
                >
                  Dar baja
                </Button>
              )}
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <section className="min-w-0 space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión local
        </p>

        <h1 id="resumen-usuarios" className="scroll-mt-6 mt-1 text-2xl font-bold text-[#7c2d12]">Usuarios</h1>

        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          CRUD mock alineado con MLBT. La baja se maneja como cambio de estado
          para conservar historial.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Total de registros</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {totalUsuarios}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Usuarios activos</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {usuariosActivos}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Usuarios retirados</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {usuariosRetirados}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-lg text-[#7c2d12]">
            <div id="formulario-usuarios" className="scroll-mt-6" />
            {estaEditando ? "Modificar usuario" : "Crear usuario"}
          </CardTitle>
          <CardDescription>
            La contraseña se valida en el formulario mock, pero no se muestra ni
            se persiste como texto plano.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <form onSubmit={guardarUsuario} className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => updateFormField("role", value)}
                >
                  <SelectTrigger id="role" className="h-9">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesUsuarios.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="documentNumber">Número de CC</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  type="text"
                  placeholder="Ej: 1000000001"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => updateFormField("status", value)}
                >
                  <SelectTrigger id="status" className="h-9">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosUsuario.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Ej: Mariana"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Ej: Gómez"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Ej: 3001234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ej: usuario@mlbt.local"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">
                  {estaEditando ? "Nueva contraseña mock" : "Contraseña"}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={estaEditando ? "Opcional" : "Mínimo 6 caracteres"}
                  value={formData.password}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">
                  Confirmar contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={estaEditando ? "Opcional" : "Repite la contraseña"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>
            </div>

            {formError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              {estaEditando && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </Button>
              )}

              <Button
                type="submit"
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                {estaEditando ? "Guardar cambios" : "Crear usuario"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <div id="tabla-usuarios" className="scroll-mt-6" />
          <CardTitle className="text-lg text-[#7c2d12]">Data Table de usuarios</CardTitle>
          <CardDescription>
            Implementada con TanStack Table y componentes shadcn/ui. Los datos
            completos se conservan en el estado local.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <DataTable
            columns={columns}
            data={usuarios}
            emptyMessage="No hay usuarios registrados en el estado local."
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(usuarioSeleccionado)}
        onOpenChange={(open) => {
          if (!open) {
            cerrarConfirmacionBaja()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Dar baja lógica al usuario?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará a{" "}
              <strong>{usuarioSeleccionado?.name}</strong> como Retirado y
              deshabilitará su acceso mock. El registro no se eliminará de la
              tabla para conservar el historial.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={darBajaUsuario}
              className="bg-red-700 text-white hover:bg-red-800"
            >
              Confirmar baja lógica
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}









