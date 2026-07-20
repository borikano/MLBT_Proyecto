import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import DataTable from "@/components/shared/DataTable"
import { useUsuariosModule } from "@/features/usuarios/useUsuariosModule"
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

export default function UsuariosListadoPage() {
  const navigate = useNavigate()

  const {
    usuarios,
    usuarioSeleccionado,
    prepararEdicion,
    abrirConfirmacionBaja,
    cerrarConfirmacionBaja,
    darBajaUsuario,
    reactivarUsuario,
  } = useUsuariosModule()

  const columns = useMemo(
    () => [
      {
        accessorKey: "registrationNumber",
        header: "Registro",
        cell: ({ row }) => (
          <span className="font-semibold text-[#7c2d12]">
            {row.original.registrationNumber}
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
            <p>Alta: {row.original.createdAt}</p>
            <p>Act: {row.original.updatedAt}</p>
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

              {usuario.status === "Retirado" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => reactivarUsuario(usuario)}
                >
                  Reactivar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
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
    [
      abrirConfirmacionBaja,
      navigate,
      prepararEdicion,
      reactivarUsuario,
    ]
  )

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión local
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">
          Data Table de usuarios
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Consulta los usuarios administrativos registrados, su estado, rol,
          acceso y fechas de actualización.
        </p>
      </div>

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-[#7c2d12]">
            Usuarios registrados
          </CardTitle>
          <CardDescription>
            Implementada con TanStack Table y componentes shadcn/ui. Los datos
            completos se conservan en el estado local compartido del módulo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={usuarios}
            emptyMessage="No hay usuarios registrados."
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
              Esta acción marcará a {usuarioSeleccionado?.name} como Retirado y
              deshabilitará su acceso. El registro no se eliminará de la tabla
              para conservar el historial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={darBajaUsuario}>
              Confirmar baja lógica
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
