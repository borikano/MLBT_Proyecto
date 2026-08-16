import { useVentasModule } from "@/features/ventas/useVentasModule"

import DataTable from "@/components/shared/DataTable"
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

export default function VentasHistorialPage() {
  const {
    ventasFiltradas,
    ventasColumns,
    salesLoading,
    salesError,
    ventaAnulacion,
    motivoAnulacion,
    setMotivoAnulacion,
    cancelError,
    isCancelling,
    cerrarAnulacion,
    confirmarAnulacion,
  } = useVentasModule()

  return (
    <section className="min-w-0 space-y-8">
      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-[#f1d4bd] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
            SECCIÓN 2
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">
            Historial de ventas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Registro consultado desde la API. Incluye ventas confirmadas y
            anuladas según los filtros activos.
          </p>
        </div>

        {salesLoading && (
          <p className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800">
            Cargando historial de ventas...
          </p>
        )}

        {salesError && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {salesError}
          </p>
        )}

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-lg text-[#7c2d12]">
              <div id="historial-ventas" className="scroll-mt-6" />
              Historial de ventas
            </CardTitle>
            <CardDescription>
              Datos persistidos por la API. La anulación requiere el permiso
              correspondiente y un motivo de auditoría.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-0">
            <DataTable
              columns={ventasColumns}
              data={ventasFiltradas}
              emptyMessage="No hay ventas para los filtros seleccionados."
            />
          </CardContent>
        </Card>

        {ventaAnulacion && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-lg text-red-800">
                Anular {ventaAnulacion.saleNumber}
              </CardTitle>
              <CardDescription className="text-red-700">
                El backend marcará la venta como anulada, repondrá existencias y
                generará movimientos de entrada dentro de la misma transacción.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-5 pt-0">
              <div className="space-y-1.5">
                <Label htmlFor="motivoAnulacion">Motivo de anulación</Label>
                <Input
                  id="motivoAnulacion"
                  value={motivoAnulacion}
                  onChange={(event) =>
                    setMotivoAnulacion(event.target.value)
                  }
                  placeholder="Mínimo 3 caracteres"
                />
              </div>

              {cancelError && (
                <p className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm text-red-700">
                  {cancelError}
                </p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={cerrarAnulacion}
                  disabled={isCancelling}
                >
                  Conservar venta
                </Button>

                <Button
                  type="button"
                  onClick={confirmarAnulacion}
                  disabled={isCancelling}
                  className="bg-red-700 text-white hover:bg-red-800"
                >
                  {isCancelling ? "Anulando..." : "Confirmar anulación"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </section>
  )
}