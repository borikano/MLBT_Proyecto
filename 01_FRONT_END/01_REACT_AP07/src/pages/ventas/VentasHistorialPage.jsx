import { useVentasModule } from "@/features/ventas/useVentasModule"

import DataTable from "@/components/shared/DataTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function VentasHistorialPage() {
  const {
    ventasFiltradas,
    ventasColumns,
  } = useVentasModule()

  return (
    <section className="min-w-0 space-y-8">
      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-[#f1d4bd] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
            SECCIÓN 2
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">

            Historial de ventas confirmadas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Registro de ventas ya procesadas. Este historial se consulta de
            forma independiente al pedido que esté en construcción.
          </p>
        </div>

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-lg text-[#7c2d12]">
              <div id="historial-ventas" className="scroll-mt-6" />
              Historial de ventas
            </CardTitle>
            <CardDescription>
              Registro simulado de ventas confirmadas. La tabla responde a la
              fecha, agrupación y segmento de pago seleccionado en análisis.
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
      </section>
    </section>
  )
}
