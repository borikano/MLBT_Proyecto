const API_TO_UI_STATUS = Object.freeze({
  CONFIRMADA: "Confirmada",
  ANULADA: "Anulada",
})

const UI_TO_API_STATUS = Object.freeze({
  Confirmada: "CONFIRMADA",
  Anulada: "ANULADA",
})

function getLocalDateParts(value) {
  if (!value) {
    return {
      fechaHora: "",
      fecha: "",
      hora: "",
    }
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    const text = String(value)

    return {
      fechaHora: text,
      fecha: text.slice(0, 10),
      hora: text.length >= 16 ? `${text.slice(11, 13)}:00` : "",
    }
  }

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, "0")
  const day = String(parsed.getDate()).padStart(2, "0")
  const hour = String(parsed.getHours()).padStart(2, "0")
  const minute = String(parsed.getMinutes()).padStart(2, "0")

  return {
    fechaHora: `${year}-${month}-${day}T${hour}:${minute}:00`,
    fecha: `${year}-${month}-${day}`,
    hora: `${hour}:00`,
  }
}

function mapSaleUser(usuario) {
  if (!usuario) {
    return "Usuario MLBT"
  }

  return (
    usuario.nombre ||
    usuario.username ||
    usuario.numeroRegistro ||
    "Usuario MLBT"
  )
}

export function apiSaleStatusToUi(status) {
  return API_TO_UI_STATUS[status] || status || "Confirmada"
}

export function uiSaleStatusToApi(status) {
  return UI_TO_API_STATUS[status] || status
}

export function mapApiSaleProductToUi(producto = {}) {
  return {
    id: producto.id,
    codigo: producto.codigo ?? "",
    nombre: producto.nombre ?? "",
    categoria: producto.categoria ?? "",
    precio: Number(producto.precio ?? 0),
    estado: producto.estado === "ACTIVO" ? "Activo" : "Inactivo",
    receta: (producto.receta || []).map((item) => ({
      itemId: item.productoInventarioId,
      cantidad: Number(item.cantidad ?? 0),
      itemRegistrationNumber:
        item.productoInventario?.numeroRegistro ?? "",
      itemName: item.productoInventario?.nombre ?? "",
      unidad: item.productoInventario?.unidad ?? "",
      itemEstado: item.productoInventario?.estado ?? "",
    })),
  }
}

export function mapApiSaleProductsToUi(productos = []) {
  return productos.map(mapApiSaleProductToUi)
}

export function mapApiSaleToUi(venta = {}) {
  const dateParts = getLocalDateParts(venta.fecha || venta.createdAt)

  return {
    id: venta.id,
    saleNumber: venta.numeroVenta ?? "",
    ...dateParts,
    tipoVenta: venta.tipoVenta ?? "",
    metodoPagoSegmento: venta.metodoPagoSegmento ?? "",
    metodoPago: venta.metodoPago ?? "",
    cliente: venta.cliente ?? "",
    usuario: mapSaleUser(venta.usuario),
    estado: apiSaleStatusToUi(venta.estado),
    items: (venta.detalles || []).map((detalle) => ({
      id: detalle.id,
      productId: detalle.productoVentaId,
      productCode: detalle.codigoProducto ?? "",
      productName: detalle.nombreProducto ?? "",
      category: detalle.categoria ?? "",
      quantity: Number(detalle.cantidad ?? 0),
      unitPrice: Number(detalle.precioUnitario ?? 0),
      subtotal: Number(detalle.subtotal ?? 0),
    })),
    total: Number(venta.total ?? 0),
  }
}

export function mapApiSalesToUi(ventas = []) {
  return ventas.map(mapApiSaleToUi)
}

export function buildCreateSalePayload({ saleForm, orderItems }) {
  return {
    cliente: String(saleForm.cliente || "").trim(),
    tipoVenta: saleForm.tipoVenta,
    metodoPagoSegmento: saleForm.metodoPagoSegmento,
    metodoPago: saleForm.metodoPago,
    items: orderItems.map((item) => ({
      productoId: Number(item.productId),
      cantidad: Number(item.quantity),
    })),
  }
}