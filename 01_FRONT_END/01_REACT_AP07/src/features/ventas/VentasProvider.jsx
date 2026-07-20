import { useState } from "react"

import { useMlbtData } from "@/context/MlbtDataContext"
import {
  productosVentaMock,
  segmentosMetodoPagoVenta,
  tiposVenta,
} from "@/data/mocks/ventas.mock"

import { Button } from "@/components/ui/button"

import { VentasContext } from "./ventasContext"
import {
  initialOrderForm,
  initialSaleForm,
  segmentacionesVenta,
  getLocalDateTime,
  getTodayIsoDate,
  getSaleParts,
  formatCurrency,
  formatQuantity,
  formatDateTime,
  generateSaleNumber,
  generateMovementNumber,
  getPaymentSegment,
  buildSegmentSummary,
  buildDemandSummary,
  buildPaymentSummary,
  buildConsumptionFromOrder,
  validateStockForProduct,
  validateStockForOrder,
} from "./ventasLogic"

export default function VentasProvider({ children }) {
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

  const contextValue = {
    productosVentaMock,
    segmentosMetodoPagoVenta,
    tiposVenta,
    segmentacionesVenta,
    formatCurrency,
    formatDateTime,
    getPaymentSegment,
    itemsInventario,
    setItemsInventario,
    movimientosInventario,
    setMovimientosInventario,
    ventas,
    setVentas,
    pedidoActual,
    setPedidoActual,
    orderForm,
    setOrderForm,
    saleForm,
    setSaleForm,
    orderError,
    setOrderError,
    saleError,
    setSaleError,
    segmentacion,
    setSegmentacion,
    fechaCalendario,
    setFechaCalendario,
    segmentoPagoFiltro,
    setSegmentoPagoFiltro,
    productosActivos,
    ventasPorFecha,
    ventasFiltradas,
    resumenSegmentado,
    demandaProductos,
    resumenPagos,
    totalPedido,
    ventasDia,
    totalVentasDia,
    totalVentasFiltradas,
    totalIngresosFiltrados,
    totalProductosFiltrados,
    consumoPedido,
    updateOrderFormField,
    updateSaleFormField,
    handleMetodoPagoSegmentoChange,
    handleSegmentacionChange,
    handleFechaCalendarioChange,
    limpiarFiltros,
    handleSaleInputChange,
    handleQuantityChange,
    agregarProducto,
    quitarProducto,
    limpiarPedido,
    confirmarVenta,
    selectedPaymentSegment,
    ventasColumns,
    resumenColumns,
    pedidoColumns,
    consumoColumns,
  }

  return (
    <VentasContext.Provider value={contextValue}>
      {children}
    </VentasContext.Provider>
  )
}
