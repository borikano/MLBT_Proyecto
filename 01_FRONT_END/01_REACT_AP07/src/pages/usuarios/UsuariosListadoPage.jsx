import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import DataTable from "@/components/shared/DataTable"
import { useUsuariosModule } from "@/features/usuarios/useUsuariosModule"
import {
  AlertDialog,
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

function formatBoolean(value) {
  return value ? "Sí" : "No"
}

function formatDate(value) {
  if (!value) {
    return "Sin fecha"
  }

  return String(value).slice(0, 10)
}

function getStatusClass(status) {
  if (status === "Activo") {
    return "bg-green-50 text-green-700"
  }

  if (status === "Retirado" || status === "Inactivo") {
    return "bg-red-50 text-red-700"
  }

  return "bg-orange-50 text-orange-700"
}

export default function UsuariosListadoPage() {
  const navigate = useNavigate()

  const {
    usuarios,
    loading,
    error,
    formError,
    usuarioSeleccionado,
    bajaMotivo,
    usuarioReactivacion,
    reactivacionMotivo,
    prepararEdicion,
    abrirConfirmacionBaja,
    cerrarConfirmacionBaja,
    setBajaMotivo,
    darBajaUsuario,
    abrirConfirmacionReactivacion,
    cerrarConfirmacionReactivacion,
    setReactivacionMotivo,
    reactivarUsuario,
  } = useUsuariosModule()

  const columns = useMemo(
    () => [
      {
        accessorKey: "registrationNumber",
        header: "Registro",
        cell: ({ row }) => (
          <span className="font-semibold text-[#7c2d12]">
            {row.original.registrationNumber || "Pendiente"}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Usuario",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">
              @{row.original.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {row.original.email || "Sin email"}
            </p>
            <p className="text-xs text-muted-foreground">
              Tel: {row.original.phone || "Sin teléfono"}
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
            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
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
          <div className="text-xs text-muted-foreground">
            <p>Alta: {formatDate(row.original.createdAt)}</p>
            <p>Act: {formatDate(row.original.updatedAt)}</p>
          </div>
        ),
      },
      {
        id: "acciones",
        header: () => <span className="text-right">Acciones</span>,
        cell: ({ row }) => {
          const usuario = row.original

          return (
            <div className="flex flex-wrap justify-end gap-2">
              <PermissionGate permission={PERMISSIONS.USERS_UPDATE}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    prepararEdicion(usuario)
                    navigate("/usuarios/crear")
                  }}
                >
                  Editar
                </Button>
              </PermissionGate>

              {usuario.status === "Retirado" ? (
                <PermissionGate permission={PERMISSIONS.USERS_UPDATE}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      abrirConfirmacionReactivacion(usuario)
                    }
                  >
                    Reactivar
                  </Button>
                </PermissionGate>
              ) : (
                <PermissionGate permission={PERMISSIONS.USERS_DEACTIVATE}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => abrirConfirmacionBaja(usuario)}
                  >
                    Dar baja
                  </Button>
                </PermissionGate>
              )}
            </div>
          )
        },
      },
    ],
    [
      abrirConfirmacionBaja,
      abrirConfirmacionReactivacion,
      navigate,
      prepararEdicion,
    ]
  )

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión API
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">
          Data Table de usuarios
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Consulta usuarios obtenidos desde la API, junto con rol, estado,
          acceso y fechas de actualización.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-[#7c2d12]">
            Usuarios registrados
          </CardTitle>
          <CardDescription>
            La API MLBT es la autoridad de los registros. El frontend conserva
            únicamente estado de presentación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && usuarios.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Cargando usuarios...
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={usuarios}
              emptyMessage="No hay usuarios registrados."
            />
          )}
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
              La API marcará a {usuarioSeleccionado?.name} como Retirado y
              revocará sus sesiones cuando corresponda. El registro se
              conserva para historial y auditoría.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="bajaMotivo">Motivo de baja</Label>
            <Input
              id="bajaMotivo"
              value={bajaMotivo}
              onChange={(event) => setBajaMotivo(event.target.value)}
              placeholder="Mínimo 3 caracteres"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancelar
            </AlertDialogCancel>
            <PermissionGate permission={PERMISSIONS.USERS_DEACTIVATE}>
              <Button
                type="button"
                disabled={loading}
                onClick={darBajaUsuario}
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                {loading ? "Procesando..." : "Confirmar baja lógica"}
              </Button>
            </PermissionGate>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(usuarioReactivacion)}
        onOpenChange={(open) => {
          if (!open) {
            cerrarConfirmacionReactivacion()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Reactivar usuario?
            </AlertDialogTitle>
            <AlertDialogDescription>
              La reactivación de {usuarioReactivacion?.name} se realizará
              mediante PUT con estado ACTIVO y motivo de auditoría.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="reactivacionMotivo">
              Motivo de reactivación
            </Label>
            <Input
              id="reactivacionMotivo"
              value={reactivacionMotivo}
              onChange={(event) =>
                setReactivacionMotivo(event.target.value)
              }
              placeholder="Mínimo 3 caracteres"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancelar
            </AlertDialogCancel>
            <PermissionGate permission={PERMISSIONS.USERS_UPDATE}>
              <Button
                type="button"
                disabled={loading}
                onClick={reactivarUsuario}
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                {loading ? "Procesando..." : "Confirmar reactivación"}
              </Button>
            </PermissionGate>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
