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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function VentasAnalisisPage() {
  const {
    segmentacionesVenta,
    segmentosMetodoPagoVenta,
    formatCurrency,
    segmentacion,
    fechaCalendario,
    segmentoPagoFiltro,
    setSegmentoPagoFiltro,
    resumenSegmentado,
    demandaProductos,
    resumenPagos,
    ventasDia,
    totalVentasDia,
    totalVentasFiltradas,
    totalIngresosFiltrados,
    totalProductosFiltrados,
    salesLoading,
    salesError,
    handleSegmentacionChange,
    handleFechaCalendarioChange,
    limpiarFiltros,
    resumenColumns,
  } = useVentasModule()

  return (
    <section className="min-w-0 space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Datos API
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">Ventas</h1>
      </div>

      {salesLoading && (
        <p className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800">
          Cargando ventas para análisis...
        </p>
      )}

      {salesError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {salesError}
        </p>
      )}

      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-[#f1d4bd] bg-[#fff7ed] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
            Sección 3
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">
            <div id="analisis-ventas" className="scroll-mt-6" />
            Análisis de ventas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Las métricas consideran ventas confirmadas provenientes de la API.
            Las ventas anuladas permanecen visibles en el historial, pero no
            incrementan ingresos ni demanda.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Ventas confirmadas hoy</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {salesError ? "N/D" : ventasDia}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Total vendido hoy</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {salesError ? "N/D" : formatCurrency(totalVentasDia)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Productos vendidos filtrados</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {salesError ? "N/D" : totalProductosFiltrados}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-lg text-[#7c2d12]">
              Segmentación de ventas
            </CardTitle>
            <CardDescription>
              Usa el calendario y el segmento de pago para filtrar. El análisis
              comercial usa únicamente ventas confirmadas.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-5 pt-0">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="fechaCalendario">Calendario</Label>
                <Input
                  id="fechaCalendario"
                  type="date"
                  value={fechaCalendario}
                  onChange={handleFechaCalendarioChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="segmentacion">Agrupar por</Label>
                <Select
                  value={segmentacion}
                  onValueChange={handleSegmentacionChange}
                >
                  <SelectTrigger id="segmentacion" className="h-9">
                    <SelectValue placeholder="Selecciona agrupación" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentacionesVenta.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="segmentoPagoFiltro">Segmento de pago</Label>
                <Select
                  value={segmentoPagoFiltro}
                  onValueChange={setSegmentoPagoFiltro}
                >
                  <SelectTrigger id="segmentoPagoFiltro" className="h-9">
                    <SelectValue placeholder="Selecciona segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los segmentos</SelectItem>
                    {segmentosMetodoPagoVenta.map((segmento) => (
                      <SelectItem key={segmento.value} value={segmento.value}>
                        {segmento.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={limpiarFiltros}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
                <p className="text-xs text-muted-foreground">
                  Ventas confirmadas filtradas
                </p>
                <p className="text-xl font-bold text-[#7c2d12]">
                  {salesError ? "N/D" : totalVentasFiltradas}
                </p>
              </div>

              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
                <p className="text-xs text-muted-foreground">
                  Ingresos filtrados
                </p>
                <p className="text-xl font-bold text-[#7c2d12]">
                  {salesError ? "N/D" : formatCurrency(totalIngresosFiltrados)}
                </p>
              </div>

              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
                <p className="text-xs text-muted-foreground">Fecha aplicada</p>
                <p className="text-xl font-bold text-[#7c2d12]">
                  {fechaCalendario || "Todas"}
                </p>
              </div>
            </div>

            <DataTable
              columns={resumenColumns}
              data={resumenSegmentado}
              emptyMessage="No hay periodos confirmados para mostrar."
            />
          </CardContent>
        </Card>

        <div className="grid gap-5 xl:grid-cols-2">
          <Card className="min-w-0 border-[#f1d4bd] bg-white">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-lg text-[#7c2d12]">
                Demanda por producto
              </CardTitle>
              <CardDescription>
                Unidades de ventas confirmadas según los filtros aplicados.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 p-5 pt-0">
              {demandaProductos.length > 0 ? (
                demandaProductos.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#7c2d12]">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total vendido: {formatCurrency(item.total)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Unidades</p>
                      <p className="text-lg font-bold text-[#7c2d12]">
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  No hay demanda confirmada para los filtros aplicados.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="min-w-0 border-[#f1d4bd] bg-white">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-lg text-[#7c2d12]">
                Métodos de pago segmentados
              </CardTitle>
              <CardDescription>
                Resumen de ventas confirmadas por segmento de pago.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 p-5 pt-0">
              {resumenPagos.length > 0 ? (
                resumenPagos.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#7c2d12]">
                        {item.segmento}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.descripcion}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {item.ventas} venta(s)
                      </p>
                      <p className="text-lg font-bold text-[#7c2d12]">
                        {formatCurrency(item.total)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  No hay pagos confirmados para los filtros aplicados.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  )
}