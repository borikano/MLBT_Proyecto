import { useState } from "react"

import DataTable from "@/components/shared/DataTable"
import { useMlbtData } from "@/context/MlbtDataContext"
import {
  productosVentaMock,
  segmentosMetodoPagoVenta,
  tiposVenta,
} from "@/data/mocks/ventas.mock"

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

const initialOrderForm = {
  productId: "",
  quantity: "1",
}

const initialSaleForm = {
  cliente: "Cliente mostrador",
  tipoVenta: "Mesa",
  metodoPagoSegmento: "efectivo",
  metodoPago: "Efectivo",
}

const segmentacionesVenta = [
  { value: "dia", label: "Día" },
  { value: "hora", label: "Hora" },
  { value: "mes", label: "Mes" },
  { value: "anio", label: "Año" },
]

function getLocalDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

function getTodayIsoDate() {
  return getLocalDateTime().slice(0, 10)
}

function getSaleParts(fechaHora) {
  const fecha = fechaHora.slice(0, 10)
  const hora = `${fechaHora.slice(11, 13)}:00`
  const mes = fecha.slice(0, 7)
  const anio = fecha.slice(0, 4)

  return { fecha, hora, mes, anio }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatQuantity(value) {
  return Number(value).toLocaleString("es-CO", {
    maximumFractionDigits: 2,
  })
}

function formatDateTime(fechaHora) {
  const parts = getSaleParts(fechaHora)
  return `${parts.fecha} ${fechaHora.slice(11, 16)}`
}

function generateSaleNumber(sales) {
  const maxSequence = sales.reduce((currentMax, sale) => {
    const sequence = Number(String(sale.saleNumber || "").replace("VTA-", ""))
    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `VTA-${String(maxSequence + 1).padStart(4, "0")}`
}

function generateMovementNumber(movements, offset = 1) {
  const maxSequence = movements.reduce((currentMax, movement) => {
    const sequence = Number(
      String(movement.movementNumber || "").replace("MOV-", "")
    )

    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax
  }, 0)

  return `MOV-${String(maxSequence + offset).padStart(4, "0")}`
}

function getPaymentSegment(segmentValue) {
  return segmentosMetodoPagoVenta.find(
    (segmento) => segmento.value === segmentValue
  )
}

function getSegmentKey(sale, segmentacion) {
  if (segmentacion === "hora") {
    return `${sale.fecha} ${sale.hora}`
  }

  if (segmentacion === "mes") {
    return getSaleParts(sale.fechaHora).mes
  }

  if (segmentacion === "anio") {
    return getSaleParts(sale.fechaHora).anio
  }

  return sale.fecha
}

function getSegmentLabel(segmentacion, key) {
  if (segmentacion === "hora") {
    return `Hora ${key}`
  }

  if (segmentacion === "mes") {
    return `Mes ${key}`
  }

  if (segmentacion === "anio") {
    return `Año ${key}`
  }

  return `Día ${key}`
}

function buildSegmentSummary(sales, segmentacion) {
  const grouped = sales.reduce((accumulator, sale) => {
    const key = getSegmentKey(sale, segmentacion)

    if (!accumulator[key]) {
      accumulator[key] = {
        key,
        label: getSegmentLabel(segmentacion, key),
        ventas: 0,
        total: 0,
        productos: 0,
      }
    }

    accumulator[key].ventas += 1
    accumulator[key].total += sale.total
    accumulator[key].productos += sale.items.reduce(
      (totalItems, item) => totalItems + item.quantity,
      0
    )

    return accumulator
  }, {})

  return Object.values(grouped).sort((a, b) => b.key.localeCompare(a.key))
}

function buildDemandSummary(sales) {
  const demand = sales.reduce((accumulator, sale) => {
    sale.items.forEach((item) => {
      if (!accumulator[item.productId]) {
        accumulator[item.productId] = {
          productId: item.productId,
          productName: item.productName,
          quantity: 0,
          total: 0,
        }
      }

      accumulator[item.productId].quantity += item.quantity
      accumulator[item.productId].total += item.subtotal
    })

    return accumulator
  }, {})

  return Object.values(demand).sort((a, b) => b.quantity - a.quantity)
}

function buildPaymentSummary(sales) {
  const grouped = sales.reduce((accumulator, sale) => {
    const segment = getPaymentSegment(sale.metodoPagoSegmento)
    const key = sale.metodoPagoSegmento || "sin-segmento"

    if (!accumulator[key]) {
      accumulator[key] = {
        key,
        segmento: segment?.label || "Sin segmento",
        descripcion: segment?.description || "Sin descripción",
        ventas: 0,
        total: 0,
      }
    }

    accumulator[key].ventas += 1
    accumulator[key].total += sale.total

    return accumulator
  }, {})

  return Object.values(grouped).sort((a, b) => b.total - a.total)
}

function buildPendingConsumption(orderItems, products) {
  return orderItems.reduce((accumulator, orderItem) => {
    const product = products.find((item) => item.id === orderItem.productId)

    if (!product) {
      return accumulator
    }

    product.receta.forEach((recipeItem) => {
      accumulator[recipeItem.itemId] =
        (accumulator[recipeItem.itemId] || 0) +
        recipeItem.cantidad * orderItem.quantity
    })

    return accumulator
  }, {})
}

function buildConsumptionFromOrder(orderItems, products) {
  const grouped = buildPendingConsumption(orderItems, products)

  return Object.entries(grouped).map(([itemId, cantidad]) => ({
    itemId: Number(itemId),
    cantidad,
  }))
}

function validateStockForProduct({
  product,
  requestedQuantity,
  currentOrder,
  products,
  inventoryItems,
}) {
  const orderWithoutCurrentProduct = currentOrder.filter(
    (item) => item.productId !== product.id
  )
  const pendingConsumption = buildPendingConsumption(
    orderWithoutCurrentProduct,
    products
  )

  for (const recipeItem of product.receta) {
    const inventoryItem = inventoryItems.find(
      (item) => item.id === recipeItem.itemId
    )

    if (!inventoryItem) {
      return `El producto ${product.nombre} no tiene completo su insumo en inventario.`
    }

    if (inventoryItem.estado !== "Activo") {
      return `El insumo ${inventoryItem.nombre} está inactivo en inventario.`
    }

    const alreadyReserved = pendingConsumption[recipeItem.itemId] || 0
    const required = recipeItem.cantidad * requestedQuantity
    const totalRequired = alreadyReserved + required

    if (Number(inventoryItem.stock) < totalRequired) {
      return `Stock insuficiente para ${product.nombre}. Falta ${inventoryItem.nombre}. Disponible: ${formatQuantity(
        inventoryItem.stock
      )} ${inventoryItem.unidad}. Requerido: ${formatQuantity(totalRequired)} ${
        inventoryItem.unidad
      }.`
    }
  }

  return ""
}

function validateStockForOrder({ orderItems, products, inventoryItems }) {
  const consumption = buildConsumptionFromOrder(orderItems, products)

  for (const requirement of consumption) {
    const inventoryItem = inventoryItems.find(
      (item) => item.id === requirement.itemId
    )

    if (!inventoryItem) {
      return "El pedido tiene un insumo que no existe en inventario."
    }

    if (inventoryItem.estado !== "Activo") {
      return `El insumo ${inventoryItem.nombre} está inactivo en inventario.`
    }

    if (Number(inventoryItem.stock) < Number(requirement.cantidad)) {
      return `Stock insuficiente para confirmar. ${inventoryItem.nombre}: disponible ${formatQuantity(
        inventoryItem.stock
      )} ${inventoryItem.unidad}, requerido ${formatQuantity(
        requirement.cantidad
      )} ${inventoryItem.unidad}.`
    }
  }

  return ""
}

export default function Ventas() {
  const {
    itemsInventario,
    setItemsInventario,
    movimientosInventario,
    setMovimientosInventario,
    ventas,
    setVentas,
  } = useMlbtData()

  const [pedidoActual, setPedidoActual] = useState([])
  const [orderForm, setOrderForm] = useState(initialOrderForm)
  const [saleForm, setSaleForm] = useState(initialSaleForm)
  const [orderError, setOrderError] = useState("")
  const [saleError, setSaleError] = useState("")
  const [segmentacion, setSegmentacion] = useState("dia")
  const [fechaCalendario, setFechaCalendario] = useState("")
  const [segmentoPagoFiltro, setSegmentoPagoFiltro] = useState("todos")

  const productosActivos = productosVentaMock.filter(
    (producto) => producto.estado === "Activo"
  )

  const ventasPorFecha = fechaCalendario
    ? ventas.filter((venta) => venta.fecha === fechaCalendario)
    : ventas

  const ventasFiltradas =
    segmentoPagoFiltro === "todos"
      ? ventasPorFecha
      : ventasPorFecha.filter(
          (venta) => venta.metodoPagoSegmento === segmentoPagoFiltro
        )

  const resumenSegmentado = buildSegmentSummary(ventasFiltradas, segmentacion)
  const demandaProductos = buildDemandSummary(ventasFiltradas)
  const resumenPagos = buildPaymentSummary(ventasFiltradas)

  const totalPedido = pedidoActual.reduce(
    (total, item) => total + item.subtotal,
    0
  )

  const ventasDia = ventas.filter(
    (venta) => venta.fecha === getTodayIsoDate()
  ).length

  const totalVentasDia = ventas
    .filter((venta) => venta.fecha === getTodayIsoDate())
    .reduce((total, venta) => total + venta.total, 0)

  const totalVentasFiltradas = ventasFiltradas.length

  const totalIngresosFiltrados = ventasFiltradas.reduce(
    (total, venta) => total + venta.total,
    0
  )

  const totalProductosFiltrados = ventasFiltradas.reduce(
    (total, venta) =>
      total +
      venta.items.reduce(
        (subtotalItems, item) => subtotalItems + item.quantity,
        0
      ),
    0
  )

  const consumoPedido = buildConsumptionFromOrder(
    pedidoActual,
    productosVentaMock
  )

  const updateOrderFormField = (name, value) => {
    setOrderForm((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (orderError) {
      setOrderError("")
    }
  }

  const updateSaleFormField = (name, value) => {
    setSaleForm((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (saleError) {
      setSaleError("")
    }
  }

  const handleMetodoPagoSegmentoChange = (value) => {
    const segment = getPaymentSegment(value)
    const defaultMethod = segment?.metodos[0]?.value || ""

    setSaleForm((currentData) => ({
      ...currentData,
      metodoPagoSegmento: value,
      metodoPago: defaultMethod,
    }))

    if (saleError) {
      setSaleError("")
    }
  }

  const handleSegmentacionChange = (value) => {
    setSegmentacion(value)
  }

  const handleFechaCalendarioChange = (event) => {
    setFechaCalendario(event.target.value)
  }

  const limpiarFiltros = () => {
    setFechaCalendario("")
    setSegmentoPagoFiltro("todos")
    setSegmentacion("dia")
  }

  const handleSaleInputChange = (event) => {
    const { name, value } = event.target
    updateSaleFormField(name, value)
  }

  const handleQuantityChange = (event) => {
    updateOrderFormField("quantity", event.target.value)
  }

  const agregarProducto = (event) => {
    event.preventDefault()

    const quantity = Number(orderForm.quantity)
    const producto = productosVentaMock.find(
      (item) => String(item.id) === orderForm.productId
    )

    if (!producto) {
      setOrderError("Selecciona un producto antes de agregarlo al pedido.")
      return
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setOrderError("La cantidad debe ser un número mayor a cero.")
      return
    }

    const productoExistente = pedidoActual.find(
      (item) => item.productId === producto.id
    )

    const requestedQuantity = productoExistente
      ? productoExistente.quantity + quantity
      : quantity

    const stockError = validateStockForProduct({
      product: producto,
      requestedQuantity,
      currentOrder: pedidoActual,
      products: productosVentaMock,
      inventoryItems: itemsInventario,
    })

    if (stockError) {
      setOrderError(stockError)
      return
    }

    if (productoExistente) {
      setPedidoActual((currentItems) =>
        currentItems.map((item) =>
          item.productId === producto.id
            ? {
                ...item,
                quantity: requestedQuantity,
                subtotal: requestedQuantity * item.unitPrice,
              }
            : item
        )
      )
    } else {
      setPedidoActual((currentItems) => [
        ...currentItems,
        {
          productId: producto.id,
          productCode: producto.codigo,
          productName: producto.nombre,
          category: producto.categoria,
          quantity,
          unitPrice: producto.precio,
          subtotal: quantity * producto.precio,
        },
      ])
    }

    setOrderForm(initialOrderForm)
  }

  const quitarProducto = (productId) => {
    setPedidoActual((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    )
  }

  const limpiarPedido = () => {
    setPedidoActual([])
    setOrderForm(initialOrderForm)
    setSaleForm(initialSaleForm)
    setOrderError("")
    setSaleError("")
  }

  const confirmarVenta = () => {
    const cliente = saleForm.cliente.trim()

    if (pedidoActual.length === 0) {
      setSaleError("Agrega al menos un producto antes de confirmar la venta.")
      return
    }

    if (
      !cliente ||
      !saleForm.tipoVenta ||
      !saleForm.metodoPagoSegmento ||
      !saleForm.metodoPago
    ) {
      setSaleError("Completa cliente, tipo de venta y método de pago.")
      return
    }

    const stockError = validateStockForOrder({
      orderItems: pedidoActual,
      products: productosVentaMock,
      inventoryItems: itemsInventario,
    })

    if (stockError) {
      setSaleError(stockError)
      return
    }

    const fechaHora = getLocalDateTime()
    const parts = getSaleParts(fechaHora)
    const consumption = buildConsumptionFromOrder(
      pedidoActual,
      productosVentaMock
    )

    const nuevaVenta = {
      id: ventas.length > 0 ? Math.max(...ventas.map((venta) => venta.id)) + 1 : 1,
      saleNumber: generateSaleNumber(ventas),
      fechaHora,
      fecha: parts.fecha,
      hora: parts.hora,
      tipoVenta: saleForm.tipoVenta,
      metodoPagoSegmento: saleForm.metodoPagoSegmento,
      metodoPago: saleForm.metodoPago,
      cliente,
      usuario: "Administrador MLBT",
      estado: "Confirmada",
      items: pedidoActual.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
      total: totalPedido,
    }

    const nuevosMovimientos = consumption.map((requirement, index) => {
      const inventoryItem = itemsInventario.find(
        (item) => item.id === requirement.itemId
      )
      const stockAnterior = Number(inventoryItem.stock)
      const stockNuevo = stockAnterior - Number(requirement.cantidad)

      return {
        id:
          movimientosInventario.length > 0
            ? Math.max(...movimientosInventario.map((movement) => movement.id)) +
              index +
              1
            : index + 1,
        movementNumber: generateMovementNumber(movimientosInventario, index + 1),
        itemId: inventoryItem.id,
        itemRegistrationNumber: inventoryItem.registrationNumber,
        itemName: inventoryItem.nombre,
        tipo: "salida",
        tipoLabel: "Salida",
        cantidad: requirement.cantidad,
        stockAnterior,
        stockNuevo,
        motivo: `Venta ${nuevaVenta.saleNumber}`,
        fecha: parts.fecha,
        usuarioId: "system-local",
      }
    })

    setItemsInventario((currentItems) =>
      currentItems.map((item) => {
        const requirement = consumption.find((entry) => entry.itemId === item.id)

        if (!requirement) {
          return item
        }

        return {
          ...item,
          stock: Number(item.stock) - Number(requirement.cantidad),
          updatedAt: parts.fecha,
        }
      })
    )

    setMovimientosInventario((currentMovements) => [
      ...nuevosMovimientos,
      ...currentMovements,
    ])

    setVentas((currentSales) => [nuevaVenta, ...currentSales])
    limpiarPedido()
  }

  const selectedPaymentSegment = getPaymentSegment(saleForm.metodoPagoSegmento)

  const ventasColumns = [
    {
      accessorKey: "saleNumber",
      header: "Venta",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.saleNumber}</span>
      ),
    },
    {
      accessorKey: "fechaHora",
      header: "Fecha y hora",
      cell: ({ row }) => formatDateTime(row.original.fechaHora),
    },
    {
      accessorKey: "cliente",
      header: "Cliente",
      cell: ({ row }) => {
        const segment = getPaymentSegment(row.original.metodoPagoSegmento)

        return (
          <div className="space-y-1">
            <p className="font-medium">{row.original.cliente}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.tipoVenta} - {segment?.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {row.original.metodoPago}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "items",
      header: "Pedido vendido",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.items.map((item) => (
            <p key={`${row.original.id}-${item.productId}`} className="text-sm">
              {item.quantity} x {item.productName}
            </p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => formatCurrency(row.original.total),
    },
    { accessorKey: "usuario", header: "Usuario" },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          {row.original.estado}
        </span>
      ),
    },
  ]

  const resumenColumns = [
    {
      accessorKey: "label",
      header: "Periodo",
      cell: ({ row }) => <span className="font-medium">{row.original.label}</span>,
    },
    { accessorKey: "ventas", header: "Ventas" },
    { accessorKey: "productos", header: "Productos" },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => formatCurrency(row.original.total),
    },
  ]

  const pedidoColumns = [
    {
      accessorKey: "productName",
      header: "Producto",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.productName}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.productCode} - {row.original.category}
          </p>
        </div>
      ),
    },
    { accessorKey: "quantity", header: "Cantidad" },
    {
      accessorKey: "unitPrice",
      header: "Precio",
      cell: ({ row }) => formatCurrency(row.original.unitPrice),
    },
    {
      accessorKey: "subtotal",
      header: "Subtotal",
      cell: ({ row }) => formatCurrency(row.original.subtotal),
    },
    {
      id: "acciones",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
            onClick={() => quitarProducto(row.original.productId)}
          >
            Quitar
          </Button>
        </div>
      ),
    },
  ]

  const consumoColumns = [
    {
      accessorKey: "itemId",
      header: "Insumo",
      cell: ({ row }) => {
        const inventoryItem = itemsInventario.find(
          (item) => item.id === row.original.itemId
        )

        return (
          <div className="space-y-1">
            <p className="font-medium">{inventoryItem?.nombre}</p>
            <p className="text-xs text-muted-foreground">
              {inventoryItem?.registrationNumber}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "cantidad",
      header: "Reservado pedido",
      cell: ({ row }) => {
        const inventoryItem = itemsInventario.find(
          (item) => item.id === row.original.itemId
        )

        return `${formatQuantity(row.original.cantidad)} ${
          inventoryItem?.unidad || ""
        }`
      },
    },
    {
      accessorKey: "stock",
      header: "Stock disponible",
      cell: ({ row }) => {
        const inventoryItem = itemsInventario.find(
          (item) => item.id === row.original.itemId
        )

        return `${formatQuantity(inventoryItem?.stock || 0)} ${
          inventoryItem?.unidad || ""
        }`
      },
    },
  ]

  return (
    <section className="min-w-0 space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
          Registro local
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">Ventas</h1>

        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Módulo mock conectado al inventario. La página separa el análisis de
          ventas, el historial confirmado y la gestión del pedido actual para
          mantener claridad operativa.
        </p>
      </div>

      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-[#f1d4bd] bg-[#fff7ed] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
            Sección 1
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">
            <div id="analisis-ventas" className="scroll-mt-6" />
            Análisis de ventas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Consulta ventas confirmadas, demanda por producto y comportamiento
            por método de pago sin afectar el pedido actual.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Ventas registradas hoy</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {ventasDia}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Total vendido hoy</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {formatCurrency(totalVentasDia)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-[#f1d4bd] bg-white">
            <CardHeader className="p-4">
              <CardDescription>Productos vendidos filtrados</CardDescription>
              <CardTitle className="text-2xl text-[#7c2d12]">
                {totalProductosFiltrados}
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
              Usa el calendario y el segmento de pago para filtrar. La tabla se
              agrupa directamente por día, hora, mes o año.
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
                <Select value={segmentacion} onValueChange={handleSegmentacionChange}>
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
                <Button type="button" variant="outline" onClick={limpiarFiltros}>
                  Limpiar filtros
                </Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
                <p className="text-xs text-muted-foreground">
                  Ventas filtradas
                </p>
                <p className="text-xl font-bold text-[#7c2d12]">
                  {totalVentasFiltradas}
                </p>
              </div>

              <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
                <p className="text-xs text-muted-foreground">
                  Ingresos filtrados
                </p>
                <p className="text-xl font-bold text-[#7c2d12]">
                  {formatCurrency(totalIngresosFiltrados)}
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
              emptyMessage="No hay periodos para mostrar."
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
                Unidades vendidas según los filtros aplicados.
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
                  No hay demanda para los filtros aplicados.
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
                Resumen por segmento de pago según los filtros aplicados.
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
                  No hay pagos para los filtros aplicados.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-[#f1d4bd] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
            Sección 2
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

      <section className="scroll-mt-6 space-y-5">
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">
            Sección 3
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










