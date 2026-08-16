import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import PermissionGate from "@/components/auth/PermissionGate"
import { Button } from "@/components/ui/button"
import {
  segmentosMetodoPagoVenta,
  tiposVenta,
} from "@/data/catalogs/sales.catalog"
import { isApiError } from "@/lib/api"
import { handleAuthenticatedApiError } from "@/lib/auth"
import {
  buildCreateSalePayload,
  mapApiSaleProductsToUi,
  mapApiSalesToUi,
  mapApiSaleToUi,
} from "@/mappers/sale.mapper"
import { PERMISSIONS } from "@/security/permissions"
import {
  cancelSaleApi,
  createSaleApi,
  listSaleProductsApi,
  listSalesApi,
} from "@/services/sales.api"

import { VentasContext } from "./ventasContext"
import {
  initialOrderForm,
  initialSaleForm,
  segmentacionesVenta,
  getTodayIsoDate,
  formatCurrency,
  formatQuantity,
  formatDateTime,
  getPaymentSegment,
  buildSegmentSummary,
  buildDemandSummary,
  buildPaymentSummary,
  buildConsumptionFromOrder,
} from "./ventasLogic"

function getFunctionalApiMessage(error, fallback) {
  if (isApiError(error, 403)) {
    return "Tu rol no tiene permiso para realizar esta operación de ventas."
  }

  if (
    isApiError(error, 400) ||
    isApiError(error, 404) ||
    isApiError(error, 409)
  ) {
    return error.message
  }

  if (isApiError(error) && error.status >= 500) {
    return fallback
  }

  return error?.message || fallback
}

export default function VentasProvider({ children }) {
  const navigate = useNavigate()

  const [productosVenta, setProductosVenta] = useState([])
  const [ventas, setVentas] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [salesLoading, setSalesLoading] = useState(true)
  const [productsError, setProductsError] = useState("")
  const [salesError, setSalesError] = useState("")

  const [pedidoActual, setPedidoActual] = useState([])
  const [orderForm, setOrderForm] = useState(initialOrderForm)
  const [saleForm, setSaleForm] = useState(initialSaleForm)
  const [orderError, setOrderError] = useState("")
  const [saleError, setSaleError] = useState("")
  const [isSavingSale, setIsSavingSale] = useState(false)

  const [segmentacion, setSegmentacion] = useState("dia")
  const [fechaCalendario, setFechaCalendario] = useState("")
  const [segmentoPagoFiltro, setSegmentoPagoFiltro] = useState("todos")

  const [ventaAnulacion, setVentaAnulacion] = useState(null)
  const [motivoAnulacion, setMotivoAnulacion] = useState("")
  const [cancelError, setCancelError] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    let active = true

    listSaleProductsApi()
      .then((data) => {
        if (!active) {
          return
        }

        setProductosVenta(mapApiSaleProductsToUi(data))
        setProductsError("")
      })
      .catch((error) => {
        if (!active) {
          return
        }

        if (handleAuthenticatedApiError(error)) {
          navigate("/login", { replace: true })
          return
        }

        setProductosVenta([])
        setProductsError(
          getFunctionalApiMessage(
            error,
            "No fue posible cargar el catálogo de productos de venta."
          )
        )
      })
      .finally(() => {
        if (active) {
          setProductsLoading(false)
        }
      })

    listSalesApi()
      .then((data) => {
        if (!active) {
          return
        }

        setVentas(mapApiSalesToUi(data))
        setSalesError("")
      })
      .catch((error) => {
        if (!active) {
          return
        }

        if (handleAuthenticatedApiError(error)) {
          navigate("/login", { replace: true })
          return
        }

        setVentas([])
        setSalesError(
          getFunctionalApiMessage(
            error,
            "No fue posible cargar el historial de ventas."
          )
        )
      })
      .finally(() => {
        if (active) {
          setSalesLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [navigate])

  const productosActivos = productosVenta.filter(
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

  const ventasConfirmadasFiltradas = ventasFiltradas.filter(
    (venta) => venta.estado === "Confirmada"
  )

  const resumenSegmentado = buildSegmentSummary(
    ventasConfirmadasFiltradas,
    segmentacion
  )
  const demandaProductos = buildDemandSummary(ventasConfirmadasFiltradas)
  const resumenPagos = buildPaymentSummary(ventasConfirmadasFiltradas)

  const totalPedido = pedidoActual.reduce(
    (total, item) => total + item.subtotal,
    0
  )

  const ventasConfirmadas = ventas.filter(
    (venta) => venta.estado === "Confirmada"
  )

  const ventasDia = ventasConfirmadas.filter(
    (venta) => venta.fecha === getTodayIsoDate()
  ).length

  const totalVentasDia = ventasConfirmadas
    .filter((venta) => venta.fecha === getTodayIsoDate())
    .reduce((total, venta) => total + venta.total, 0)

  const totalVentasFiltradas = ventasConfirmadasFiltradas.length

  const totalIngresosFiltrados = ventasConfirmadasFiltradas.reduce(
    (total, venta) => total + venta.total,
    0
  )

  const totalProductosFiltrados = ventasConfirmadasFiltradas.reduce(
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
    productosVenta
  ).map((requirement) => {
    const recipeItem = productosVenta
      .flatMap((producto) => producto.receta)
      .find((item) => item.itemId === requirement.itemId)

    return {
      ...requirement,
      itemRegistrationNumber: recipeItem?.itemRegistrationNumber || "",
      itemName: recipeItem?.itemName || `Insumo ${requirement.itemId}`,
      unidad: recipeItem?.unidad || "",
    }
  })

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
    const producto = productosVenta.find(
      (item) => String(item.id) === orderForm.productId
    )

    if (!producto) {
      setOrderError("Selecciona un producto antes de agregarlo al pedido.")
      return
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setOrderError("La cantidad debe ser un número entero mayor a cero.")
      return
    }

    if (!Array.isArray(producto.receta) || producto.receta.length === 0) {
      setOrderError(
        "El producto no tiene una receta disponible y no puede agregarse."
      )
      return
    }

    const productoExistente = pedidoActual.find(
      (item) => item.productId === producto.id
    )

    const requestedQuantity = productoExistente
      ? productoExistente.quantity + quantity
      : quantity

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

  const confirmarVenta = async () => {
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

    setIsSavingSale(true)
    setSaleError("")

    try {
      const created = await createSaleApi(
        buildCreateSalePayload({
          saleForm,
          orderItems: pedidoActual,
        })
      )
      const nuevaVenta = mapApiSaleToUi(created)

      setVentas((currentSales) => [
        nuevaVenta,
        ...currentSales.filter((venta) => venta.id !== nuevaVenta.id),
      ])

      limpiarPedido()
    } catch (error) {
      if (handleAuthenticatedApiError(error)) {
        navigate("/login", { replace: true })
        return
      }

      setSaleError(
        getFunctionalApiMessage(
          error,
          "No fue posible confirmar la venta."
        )
      )
    } finally {
      setIsSavingSale(false)
    }
  }

  const abrirAnulacion = (venta) => {
    setVentaAnulacion(venta)
    setMotivoAnulacion("")
    setCancelError("")
  }

  const cerrarAnulacion = () => {
    setVentaAnulacion(null)
    setMotivoAnulacion("")
    setCancelError("")
  }

  const confirmarAnulacion = async () => {
    const reason = motivoAnulacion.trim()

    if (!ventaAnulacion) {
      setCancelError("Selecciona una venta para anular.")
      return
    }

    if (reason.length < 3) {
      setCancelError(
        "El motivo de anulación es obligatorio y debe tener mínimo 3 caracteres."
      )
      return
    }

    setIsCancelling(true)
    setCancelError("")

    try {
      const cancelled = await cancelSaleApi(ventaAnulacion.id, reason)
      const ventaActualizada = mapApiSaleToUi(cancelled)

      setVentas((currentSales) =>
        currentSales.map((venta) =>
          venta.id === ventaActualizada.id ? ventaActualizada : venta
        )
      )

      cerrarAnulacion()
    } catch (error) {
      if (handleAuthenticatedApiError(error)) {
        navigate("/login", { replace: true })
        return
      }

      setCancelError(
        getFunctionalApiMessage(
          error,
          "No fue posible anular la venta."
        )
      )
    } finally {
      setIsCancelling(false)
    }
  }

  const selectedPaymentSegment = getPaymentSegment(
    saleForm.metodoPagoSegmento
  )

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
            <p
              key={`${row.original.id}-${item.id || item.productId}`}
              className="text-sm"
            >
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
      cell: ({ row }) => {
        const cancelled = row.original.estado === "Anulada"

        return (
          <span
            className={
              cancelled
                ? "rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                : "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
            }
          >
            {row.original.estado}
          </span>
        )
      },
    },
    {
      id: "acciones",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.estado === "Confirmada" ? (
            <PermissionGate permission={PERMISSIONS.SALES_CANCEL}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={() => abrirAnulacion(row.original)}
              >
                Anular
              </Button>
            </PermissionGate>
          ) : (
            <span className="text-xs text-muted-foreground">Sin acciones</span>
          )}
        </div>
      ),
    },
  ]

  const resumenColumns = [
    {
      accessorKey: "label",
      header: "Periodo",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.label}</span>
      ),
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
      header: "Precio de referencia",
      cell: ({ row }) => formatCurrency(row.original.unitPrice),
    },
    {
      accessorKey: "subtotal",
      header: "Subtotal estimado",
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
      accessorKey: "itemName",
      header: "Insumo",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.itemName}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.itemRegistrationNumber || `ID ${row.original.itemId}`}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "cantidad",
      header: "Consumo estimado",
      cell: ({ row }) =>
        `${formatQuantity(row.original.cantidad)} ${
          row.original.unidad || ""
        }`,
    },
    {
      id: "autoridad",
      header: "Validación final",
      cell: () => (
        <span className="text-xs text-muted-foreground">
          API al confirmar
        </span>
      ),
    },
  ]

  const contextValue = {
    productosVenta,
    segmentosMetodoPagoVenta,
    tiposVenta,
    segmentacionesVenta,
    formatCurrency,
    formatDateTime,
    getPaymentSegment,
    ventas,
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
    productsLoading,
    salesLoading,
    productsError,
    salesError,
    isSavingSale,
    ventaAnulacion,
    motivoAnulacion,
    setMotivoAnulacion,
    cancelError,
    isCancelling,
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
    abrirAnulacion,
    cerrarAnulacion,
    confirmarAnulacion,
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