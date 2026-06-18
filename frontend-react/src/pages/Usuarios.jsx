import { useState } from "react"

import { usuariosMock } from "@/data/mocks/usuarios.mock"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  const totalUsuarios = usuarios.length
  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.estado === "Activo"
  ).length

  const abrirConfirmacion = (usuario) => {
    setUsuarioSeleccionado(usuario)
  }

  const cerrarConfirmacion = () => {
    setUsuarioSeleccionado(null)
  }

  const eliminarUsuario = () => {
    if (!usuarioSeleccionado) {
      return
    }

    setUsuarios((usuariosActuales) =>
      usuariosActuales.filter(
        (usuario) => usuario.id !== usuarioSeleccionado.id
      )
    )

    cerrarConfirmacion()
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Gestión local
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">Usuarios</h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Listado simulado de usuarios administrativos de María La Bonita
          Taquería. Los datos se gestionan de forma local con estado de React.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader>
            <CardDescription>Total de usuarios</CardDescription>
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
      </div>

      <Card className="border-[#f1d4bd] bg-white">
        <CardHeader>
          <CardTitle className="text-[#7c2d12]">
            Data Table de usuarios
          </CardTitle>
          <CardDescription>
            Primera versión del CRUD mockeado. La eliminación solo modifica el
            estado local y no afecta ningún backend.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fff7ed]">
                  <TableHead>Nombre</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {usuarios.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No hay usuarios registrados en el estado local.
                    </TableCell>
                  </TableRow>
                ) : (
                  usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        {usuario.nombre}
                      </TableCell>
                      <TableCell>{usuario.usuario}</TableCell>
                      <TableCell>{usuario.correo}</TableCell>
                      <TableCell>{usuario.rol}</TableCell>
                      <TableCell>
                        <span
                          className={
                            usuario.estado === "Activo"
                              ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                              : "rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                          }
                        >
                          {usuario.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                          onClick={() => abrirConfirmacion(usuario)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(usuarioSeleccionado)}
        onOpenChange={(open) => {
          if (!open) {
            cerrarConfirmacion()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar usuario del listado local?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará a{" "}
              <strong>{usuarioSeleccionado?.nombre}</strong> únicamente del
              estado local de React. No se enviará información a ningún backend.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={eliminarUsuario}
              className="bg-red-700 text-white hover:bg-red-800"
            >
              Confirmar eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
