import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { Link } from "react-router-dom"

import { useUsuariosModule } from "@/features/usuarios/useUsuariosModule"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function formatDate(value) {
  if (!value) {
    return "Sin fecha"
  }

  return String(value).slice(0, 10)
}

export default function UsuariosResumenPage() {
  const {
    rolesUsuarios,
    usuarios,
    loading,
    error,
    totalUsuarios,
    usuariosActivos,
    usuariosRetirados,
    usuariosPendientes,
    usuariosConAcceso,
  } = useUsuariosModule()

  const usuariosRecientes = [...usuarios]
    .sort((a, b) =>
      String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))
    )
    .slice(0, 4)

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión API
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">
          Usuarios
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Resumen operativo construido desde los usuarios entregados por la
          API MLBT.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && usuarios.length === 0 && (
        <div className="rounded-lg border border-[#f1d4bd] bg-white px-4 py-3 text-sm text-muted-foreground">
          Cargando usuarios...
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardDescription>Total de registros</CardDescription>
            <CardTitle className="text-3xl text-[#7c2d12]">
              {totalUsuarios}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardDescription>Usuarios activos</CardDescription>
            <CardTitle className="text-3xl text-[#7c2d12]">
              {usuariosActivos}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardDescription>Usuarios retirados</CardDescription>
            <CardTitle className="text-3xl text-[#7c2d12]">
              {usuariosRetirados}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardDescription>Usuarios con acceso</CardDescription>
            <CardTitle className="text-3xl text-[#7c2d12]">
              {usuariosConAcceso}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {usuariosPendientes > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">
              Usuarios pendientes
            </CardTitle>
            <CardDescription className="text-orange-700">
              Hay {usuariosPendientes} usuario(s) con estado pendiente. Revisa
              el listado para completar la gestión administrativa.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-[#7c2d12]">
              Distribución por rol
            </CardTitle>
            <CardDescription>
              Datos cargados desde la API y normalizados para presentación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rolesUsuarios.map((role) => {
              const totalPorRol = usuarios.filter(
                (usuario) => usuario.role === role.value
              ).length

              return (
                <div
                  key={role.value}
                  className="flex items-center justify-between rounded-lg border border-[#f1d4bd] bg-[#fff7ed] px-4 py-3"
                >
                  <span className="text-sm font-medium">{role.label}</span>
                  <span className="text-lg font-bold text-[#7c2d12]">
                    {totalPorRol}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-[#7c2d12]">
              Seguimiento reciente
            </CardTitle>
            <CardDescription>
              Últimos usuarios actualizados según la API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {usuariosRecientes.map((usuario) => (
              <div
                key={usuario.id}
                className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#7c2d12]">
                      {usuario.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{usuario.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {usuario.email || "Sin email"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold">
                    {usuario.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Actualizado: {formatDate(usuario.updatedAt)}
                </p>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <PermissionGate permission={PERMISSIONS.USERS_CREATE}>
                <Button
                  asChild
                  className="bg-[#7c2d12] hover:bg-[#9a3412]"
                >
                  <Link to="/usuarios/crear">Crear usuario</Link>
                </Button>
              </PermissionGate>
              <Button asChild variant="outline">
                <Link to="/usuarios/listado">Ver listado</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
