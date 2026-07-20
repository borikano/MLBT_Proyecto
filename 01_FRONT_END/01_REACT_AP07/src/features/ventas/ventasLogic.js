import { segmentosMetodoPagoVenta } from "@/data/mocks/ventas.mock"

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

export {
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
}
