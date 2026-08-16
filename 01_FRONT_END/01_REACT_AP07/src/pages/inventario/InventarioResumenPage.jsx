import { useInventarioModule } from "@/features/inventario/useInventarioModule"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function InventarioResumenPage() {
  const {
    items,
    loading,
    error,
    totalItems,
    itemsActivos,
    itemsStockBajo,
    totalStockBajo,
  } = useInventarioModule()

  return (
    <section className="min-w-0 space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Control API
        </p>

        <h1
          id="resumen-inventario"
          className="scroll-mt-6 mt-1 text-2xl font-bold text-[#7c2d12]"
        >
          Inventario
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Existencias consultadas desde la API MLBT.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && items.length === 0 && (
        <div className="rounded-lg border border-[#f1d4bd] bg-white px-4 py-3 text-sm text-muted-foreground">
          Cargando inventario...
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Total de ítems</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {totalItems}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-[#f1d4bd] bg-white">
          <CardHeader className="p-4">
            <CardDescription>Ítems activos</CardDescription>
            <CardTitle className="text-2xl text-[#7c2d12]">
              {itemsActivos}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="p-4">
            <CardDescription className="text-red-700">
              Alertas de stock bajo
            </CardDescription>
            <CardTitle className="text-2xl text-red-800">
              {totalStockBajo}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card
        className={
          totalStockBajo > 0
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }
      >
        <CardHeader className="p-5 pb-3">
          <CardTitle
            className={
              totalStockBajo > 0 ? "text-red-800" : "text-green-800"
            }
          >
            {totalStockBajo > 0
              ? "Alertas visuales de inventario"
              : "Inventario sin alertas críticas"}
          </CardTitle>
          <CardDescription
            className={
              totalStockBajo > 0 ? "text-red-700" : "text-green-700"
            }
          >
            {totalStockBajo > 0
              ? "Estos ítems están en el stock mínimo o por debajo del stock mínimo definido."
              : "Actualmente no hay ítems activos por debajo del stock mínimo."}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {totalStockBajo > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {itemsStockBajo.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-red-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.registrationNumber} - {item.categoria}
                      </p>
                    </div>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Stock bajo
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-red-50 p-2">
                      <p className="text-xs text-red-700">Stock actual</p>
                      <p className="text-lg font-bold text-red-800">
                        {item.stock} {item.unidad}
                      </p>
                    </div>

                    <div className="rounded-md bg-orange-50 p-2">
                      <p className="text-xs text-orange-700">Stock mínimo</p>
                      <p className="text-lg font-bold text-orange-800">
                        {item.stockMin} {item.unidad}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-green-800">
              Todos los ítems activos se encuentran por encima del stock mínimo
              definido.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
