import PermissionGate from "@/components/auth/PermissionGate"
import { PERMISSIONS } from "@/security/permissions"
import { useInventarioModule } from "@/features/inventario/useInventarioModule"

import DataTable from "@/components/shared/DataTable"
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

export default function InventarioTablasPage() {
  const {
    loading,
    error,
    itemFormError,
    itemSeleccionado,
    filtroInventario,
    setFiltroInventario,
    itemsFiltrados,
    cerrarConfirmacionBaja,
    darBajaItem,
    itemColumns,
  } = useInventarioModule()

  return (
    <section className="min-w-0 space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {itemFormError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {itemFormError}
        </div>
      )}

      <Card className="min-w-0 border-[#f1d4bd] bg-white">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle
                id="tablas-inventario"
                className="scroll-mt-6 text-lg text-[#7c2d12]"
              >
                Data Table de inventario
              </CardTitle>
              <CardDescription>
                Ítems persistidos en la API con control de stock, alertas y
                estado.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={filtroInventario === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroInventario("todos")}
                className={
                  filtroInventario === "todos"
                    ? "bg-[#7c2d12] hover:bg-[#9a3412]"
                    : ""
                }
              >
                Todos
              </Button>

              <Button
                type="button"
                variant={
                  filtroInventario === "stock-bajo" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFiltroInventario("stock-bajo")}
                className={
                  filtroInventario === "stock-bajo"
                    ? "bg-red-700 hover:bg-red-800"
                    : "border-red-200 text-red-700 hover:bg-red-50"
                }
              >
                Stock bajo
              </Button>

              <Button
                type="button"
                variant={filtroInventario === "activos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroInventario("activos")}
                className={
                  filtroInventario === "activos"
                    ? "bg-green-700 hover:bg-green-800"
                    : ""
                }
              >
                Activos
              </Button>

              <Button
                type="button"
                variant={
                  filtroInventario === "inactivos" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFiltroInventario("inactivos")}
                className={
                  filtroInventario === "inactivos"
                    ? "bg-slate-700 hover:bg-slate-800"
                    : ""
                }
              >
                Inactivos
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {loading && itemsFiltrados.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Cargando inventario...
            </p>
          ) : (
            <DataTable
              columns={itemColumns}
              data={itemsFiltrados}
              emptyMessage="No hay ítems para el filtro seleccionado."
            />
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(itemSeleccionado)}
        onOpenChange={(open) => {
          if (!open) {
            cerrarConfirmacionBaja()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Dar baja al ítem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará{" "}
              <strong>{itemSeleccionado?.nombre}</strong> como Inactivo en la
              API. El registro no se elimina.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancelar
            </AlertDialogCancel>
            <PermissionGate permission={PERMISSIONS.INVENTORY_UPDATE}>
              <AlertDialogAction
                onClick={darBajaItem}
                disabled={loading}
                className="bg-red-700 text-white hover:bg-red-800"
              >
                {loading ? "Procesando..." : "Confirmar baja"}
              </AlertDialogAction>
            </PermissionGate>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
