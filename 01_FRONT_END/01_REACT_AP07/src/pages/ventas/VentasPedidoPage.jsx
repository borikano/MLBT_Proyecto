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

export default function VentasPedidoPage() {
  const {
    segmentosMetodoPagoVenta,
    tiposVenta,
    formatCurrency,
    orderForm,
    saleForm,
    orderError,
    saleError,
    pedidoActual,
    totalPedido,
    consumoPedido,
    productosActivos,
    selectedPaymentSegment,
    handleSaleInputChange,
    handleQuantityChange,
    updateOrderFormField,
    updateSaleFormField,
    handleMetodoPagoSegmentoChange,
    agregarProducto,
    limpiarPedido,
    confirmarVenta,
    pedidoColumns,
    consumoColumns,
  } = useVentasModule()

  return (
    <section className="min-w-0 space-y-8">
      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">
            Sección 1
          </p>
          <h2 className="mt-1 text-xl font-bold text-orange-900">
            Gestión del pedido actual
          </h2>
          <p className="mt-1 text-sm text-orange-800">
            Construye una venta nueva. Los productos agregados al pedido validan
            insumos contra inventario y solo descuentan stock cuando se confirma
            la venta.
          </p>
        </div>

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-lg text-[#7c2d12]">
              Datos del pedido
            </CardTitle>
            <CardDescription>
              Define cliente, tipo de venta y método de pago antes de confirmar.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-0">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  name="cliente"
                  type="text"
                  placeholder="Ej: Cliente mostrador"
                  value={saleForm.cliente}
                  onChange={handleSaleInputChange}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tipoVenta">Tipo de venta</Label>
                <Select
                  value={saleForm.tipoVenta}
                  onValueChange={(value) => updateSaleFormField("tipoVenta", value)}
                >
                  <SelectTrigger id="tipoVenta" className="h-9">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposVenta.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="metodoPagoSegmento">Segmento de pago</Label>
                <Select
                  value={saleForm.metodoPagoSegmento}
                  onValueChange={handleMetodoPagoSegmentoChange}
                >
                  <SelectTrigger id="metodoPagoSegmento" className="h-9">
                    <SelectValue placeholder="Selecciona segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentosMetodoPagoVenta.map((segmento) => (
                      <SelectItem key={segmento.value} value={segmento.value}>
                        {segmento.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="metodoPago">Método de pago</Label>
                <Select
                  value={saleForm.metodoPago}
                  onValueChange={(value) =>
                    updateSaleFormField("metodoPago", value)
                  }
                >
                  <SelectTrigger id="metodoPago" className="h-9">
                    <SelectValue placeholder="Selecciona método" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedPaymentSegment?.metodos.map((metodo) => (
                      <SelectItem key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-lg text-[#7c2d12]">
              Agregar producto al pedido
            </CardTitle>
            <CardDescription>
              El sistema valida los insumos contra el stock disponible antes de
              agregar productos al pedido.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-0">
            <form onSubmit={agregarProducto} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[2fr_1fr_auto] md:items-end">
                <div className="space-y-1.5">
                  <Label htmlFor="productId">Producto</Label>
                  <Select
                    value={orderForm.productId}
                    onValueChange={(value) =>
                      updateOrderFormField("productId", value)
                    }
                  >
                    <SelectTrigger id="productId" className="h-9">
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productosActivos.map((producto) => (
                        <SelectItem key={producto.id} value={String(producto.id)}>
                          {producto.codigo} - {producto.nombre} -{" "}
                          {formatCurrency(producto.precio)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={orderForm.quantity}
                    onChange={handleQuantityChange}
                    className="h-9"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#7c2d12] hover:bg-[#9a3412]"
                >
                  Agregar
                </Button>
              </div>

              {orderError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {orderError}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {consumoPedido.length > 0 && (
          <Card className="min-w-0 border-orange-200 bg-orange-50">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-lg text-orange-800">
                Insumos reservados para el pedido
              </CardTitle>
              <CardDescription className="text-orange-700">
                Estos insumos se descontarán del inventario al confirmar la venta.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 pt-0">
              <DataTable
                columns={consumoColumns}
                data={consumoPedido}
                emptyMessage="No hay insumos reservados."
              />
            </CardContent>
          </Card>
        )}

        <Card className="min-w-0 border-[#f1d4bd] bg-white">
          <CardHeader className="p-5 pb-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-lg text-[#7c2d12]">
                  <div id="pedido-actual" className="scroll-mt-6" />
                  Pedido actual
                </CardTitle>
                <CardDescription>
                  Productos agregados antes de confirmar la venta.
                </CardDescription>
              </div>

              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] px-4 py-3 text-right">
                <p className="text-xs text-muted-foreground">Total pedido</p>
                <p className="text-2xl font-bold text-[#7c2d12]">
                  {formatCurrency(totalPedido)}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-5 pt-0">
            <DataTable
              columns={pedidoColumns}
              data={pedidoActual}
              emptyMessage="No hay productos agregados al pedido actual."
            />

            {saleError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {saleError}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={limpiarPedido}>
                Limpiar pedido
              </Button>

              <Button
                type="button"
                onClick={confirmarVenta}
                className="bg-[#7c2d12] hover:bg-[#9a3412]"
              >
                Confirmar venta
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  )
}
