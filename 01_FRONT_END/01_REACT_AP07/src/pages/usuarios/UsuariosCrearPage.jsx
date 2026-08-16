import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { useNavigate } from "react-router-dom"

import { useUsuariosModule } from "@/features/usuarios/useUsuariosModule"
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

export default function UsuariosCrearPage() {
  const navigate = useNavigate()

  const {
    estadosUsuario,
    rolesUsuarios,
    loading,
    formData,
    formError,
    estaEditando,
    limpiarFormulario,
    updateFormField,
    handleChange,
    guardarUsuario,
  } = useUsuariosModule()

  const handleSubmit = async (event) => {
    const guardado = await guardarUsuario(event)

    if (guardado) {
      navigate("/usuarios/listado")
    }
  }

  const handleCancel = () => {
    limpiarFormulario()
    navigate("/usuarios/listado")
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión API
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">
          {estaEditando ? "Editar usuario" : "Crear usuario"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Registra o actualiza usuarios administrativos usando la API MLBT como
          fuente de verdad. Los identificadores y números de registro son
          generados por el backend.
        </p>
      </div>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-[#7c2d12]">
            {estaEditando ? "Modificar usuario" : "Crear usuario"}
          </CardTitle>
          <CardDescription>
            Completa los datos del usuario, rol, estado y credenciales de
            acceso.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => updateFormField("role", value)}
                >
                  <SelectTrigger id="role">
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

              <div className="grid gap-2">
                <Label htmlFor="documentNumber">Número de CC</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  placeholder="Ej: 1000000001"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => updateFormField("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecciona estado" />
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

              <div className="grid gap-2">
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ej: Mariana"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ej: Gómez"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: 3001234567"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  placeholder="Ej: mariana.gomez"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej: usuario@mlbt.local"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  {estaEditando ? "Nueva contraseña" : "Contraseña"}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Repite la contraseña"
                />
              </div>

              {estaEditando && (
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="motivo">
                    Motivo de auditoría
                  </Label>
                  <Input
                    id="motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    placeholder="Obligatorio si cambias rol o estado"
                  />
                  <p className="text-xs text-muted-foreground">
                    Para cambios efectivos de rol o estado, el backend exige
                    un motivo de mínimo 3 caracteres.
                  </p>
                </div>
              )}
            </div>

            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-3">
              {estaEditando && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar edición
                </Button>
              )}

              <PermissionGate
                permission={
                  estaEditando
                    ? PERMISSIONS.USERS_UPDATE
                    : PERMISSIONS.USERS_CREATE
                }
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7c2d12] hover:bg-[#9a3412]"
                >
                  {loading
                    ? "Guardando..."
                    : estaEditando
                      ? "Guardar cambios"
                      : "Crear usuario"}
                </Button>
              </PermissionGate>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
