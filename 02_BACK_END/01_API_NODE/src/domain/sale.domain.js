function buildSaleNumber(id) {
  return `VTA-${String(id).padStart(6, "0")}`;
}

function buildSaleProductCode(id) {
  return `VEN-${String(id).padStart(6, "0")}`;
}

function buildMovementNumber(id) {
  return `MOV-${String(id).padStart(6, "0")}`;
}

function buildSaleCancelWhere(id) {
  return {
    id,
    estado: "CONFIRMADA"
  };
}

function buildLegacyStructuredSale(productoId, data) {
  return {
    cliente: "Cliente mostrador",
    tipoVenta: "Mesa",
    metodoPagoSegmento: "efectivo",
    metodoPago: "Efectivo",
    items: [
      {
        productoId,
        cantidad: data.cantidad
      }
    ]
  };
}

function calculateSaleTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.precioUnitario) * Number(item.cantidad),
    0
  );
}

function normalizeSaleProduct(producto) {
  return {
    ...producto,
    precio: Number(producto.precio),
    receta: producto.receta?.map((item) => ({
      ...item,
      cantidad: Number(item.cantidad)
    })) || []
  };
}

function normalizeSale(venta) {
  return {
    ...venta,
    total: Number(venta.total),
    detalles: venta.detalles?.map((detalle) => ({
      ...detalle,
      precioUnitario: Number(detalle.precioUnitario),
      subtotal: Number(detalle.subtotal)
    })) || []
  };
}

function buildSaleWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
      { numeroVenta: { contains: query.buscar } },
      { cliente: { contains: query.buscar } },
      { producto: { contains: query.buscar } }
    ];
  }

  if (query.tipoVenta) {
    where.tipoVenta = query.tipoVenta;
  }

  if (query.metodoPagoSegmento) {
    where.metodoPagoSegmento = query.metodoPagoSegmento;
  }

  if (query.estado) {
    where.estado = query.estado;
  }

  if (query.usuarioId) {
    where.usuarioId = query.usuarioId;
  }

  return where;
}

function buildSaleProductWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
      { codigo: { contains: query.buscar } },
      { nombre: { contains: query.buscar } },
      { categoria: { contains: query.buscar } }
    ];
  }

  if (query.categoria) {
    where.categoria = query.categoria;
  }

  if (query.estado) {
    where.estado = query.estado;
  }

  return where;
}
export {
  buildSaleNumber,
  buildSaleProductCode,
  buildMovementNumber,
  buildSaleCancelWhere,
  buildLegacyStructuredSale,
  calculateSaleTotal,
  normalizeSaleProduct,
  normalizeSale,
  buildSaleWhere,
  buildSaleProductWhere
};
