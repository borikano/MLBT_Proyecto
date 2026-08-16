import { prisma } from "../config/prisma.js";
import { isValidPaymentMethod } from "../constants/sale.constants.js";
import { createHttpError } from "../utils/http-error.js";
import {
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
} from "../domain/sale.domain.js";
import {
  listSaleProducts,
  getSaleProductById,
  createSaleProduct,
  updateSaleProduct,
  deactivateSaleProduct
} from "./sale-product.service.js";
import { deleteSale } from "./sale-cancellation.service.js";

function buildConsumption(items, productMap) {
  const grouped = new Map();

  for (const item of items) {
    const producto = productMap.get(item.productoId);

    for (const receta of producto.receta) {
      const required = Number(receta.cantidad) * Number(item.cantidad);
      const previous = grouped.get(receta.productoInventarioId) || 0;
      grouped.set(receta.productoInventarioId, previous + required);
    }
  }

  return [...grouped.entries()].map(([productoInventarioId, cantidad]) => ({
    productoInventarioId,
    cantidad
  }));
}

async function createStructuredSale(data, usuarioId) {
  return prisma.$transaction(async (tx) => {
    const ids = [...new Set(data.items.map((item) => item.productoId))];

    const productos = await tx.productoVenta.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        receta: {
          include: {
            productoInventario: true
          }
        }
      }
    });

    if (productos.length !== ids.length) {
      throw createHttpError(400, "El pedido contiene productos inexistentes");
    }

    if (productos.some((producto) => producto.estado !== "ACTIVO")) {
      throw createHttpError(409, "El pedido contiene productos inactivos");
    }

    if (productos.some((producto) => producto.receta.length === 0)) {
      throw createHttpError(
        409,
        "Todos los productos vendidos deben tener una receta configurada"
      );
    }

    const productMap = new Map(
      productos.map((producto) => [producto.id, producto])
    );

    const detalles = data.items.map((item) => {
      const producto = productMap.get(item.productoId);
      const precioUnitario = Number(producto.precio);

      return {
        productoVentaId: producto.id,
        codigoProducto: producto.codigo,
        nombreProducto: producto.nombre,
        categoria: producto.categoria,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal: precioUnitario * item.cantidad
      };
    });

    const total = calculateSaleTotal(detalles);

    const ventaCreada = await tx.venta.create({
      data: {
        numeroVenta: null,
        fecha: new Date(),
        tipoVenta: data.tipoVenta,
        metodoPagoSegmento: data.metodoPagoSegmento,
        metodoPago: data.metodoPago,
        cliente: data.cliente,
        estado: "CONFIRMADA",
        total,
        usuarioId: usuarioId || null,
        detalles: {
          create: detalles
        }
      }
    });

    const numeroVenta = buildSaleNumber(ventaCreada.id);

    await tx.venta.update({
      where: { id: ventaCreada.id },
      data: { numeroVenta }
    });

    const consumo = buildConsumption(data.items, productMap);

    for (const item of consumo) {
      const updateResult = await tx.productoInventario.updateMany({
        where: {
          id: item.productoInventarioId,
          estado: "ACTIVO",
          stock: { gte: item.cantidad }
        },
        data: {
          stock: { decrement: item.cantidad }
        }
      });

      if (updateResult.count !== 1) {
        throw createHttpError(
          409,
          "Stock insuficiente o producto de inventario inactivo"
        );
      }

      const actualizado = await tx.productoInventario.findUnique({
        where: { id: item.productoInventarioId }
      });

      const stockNuevo = Number(actualizado.stock);
      const stockAnterior = stockNuevo + Number(item.cantidad);

      const movimiento = await tx.movimientoInventario.create({
        data: {
          numeroMovimiento: null,
          productoId: item.productoInventarioId,
          tipo: "SALIDA",
          cantidad: item.cantidad,
          stockAnterior,
          stockNuevo,
          motivo: `Venta ${numeroVenta}`,
          usuarioId: usuarioId || null,
          ventaId: ventaCreada.id
        }
      });

      await tx.movimientoInventario.update({
        where: { id: movimiento.id },
        data: {
          numeroMovimiento: buildMovementNumber(movimiento.id)
        }
      });
    }

    const venta = await tx.venta.findUnique({
      where: { id: ventaCreada.id },
      include: {
        usuario: {
          select: {
            id: true,
            numeroRegistro: true,
            nombre: true,
            username: true,
            rol: true
          }
        },
        detalles: true
      }
    });

    return normalizeSale(venta);
  });
}

async function createLegacySale(data, usuarioId) {
  const producto = await prisma.productoVenta.findFirst({
    where: {
      nombre: data.producto,
      estado: "ACTIVO"
    },
    select: {
      id: true
    }
  });

  if (!producto) {
    throw createHttpError(
      409,
      "La venta legacy requiere un producto activo del catalogo de ventas"
    );
  }

  // El total recibido por compatibilidad no es autoritativo.
  return createStructuredSale(
    buildLegacyStructuredSale(producto.id, data),
    usuarioId || data.usuarioId || null
  );
}

async function listSales(query = {}) {
  const ventas = await prisma.venta.findMany({
    where: buildSaleWhere(query),
    include: {
      usuario: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          username: true,
          rol: true
        }
      },
      detalles: true
    },
    orderBy: { fecha: "desc" }
  });

  return ventas.map(normalizeSale);
}

async function getSaleById(id) {
  const venta = await prisma.venta.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          username: true,
          rol: true
        }
      },
      detalles: true,
      movimientos: {
        orderBy: { id: "asc" }
      }
    }
  });

  if (!venta) {
    throw createHttpError(404, "Venta no encontrada");
  }

  return normalizeSale(venta);
}

async function createSale(data, usuarioId) {
  if (Array.isArray(data.items)) {
    return createStructuredSale(data, usuarioId);
  }

  return createLegacySale(data, usuarioId);
}

async function updateSale(id, data) {
  const actual = await prisma.venta.findUnique({
    where: { id },
    include: {
      detalles: {
        select: { id: true }
      }
    }
  });

  if (!actual) {
    throw createHttpError(404, "Venta no encontrada");
  }

  const finalPaymentSegment =
    data.metodoPagoSegmento ?? actual.metodoPagoSegmento;
  const finalPaymentMethod = data.metodoPago ?? actual.metodoPago;

  if (!isValidPaymentMethod(finalPaymentSegment, finalPaymentMethod)) {
    throw createHttpError(
      400,
      "El metodo de pago no corresponde al segmento seleccionado"
    );
  }

  const legacyFields = ["producto", "cantidad", "total"];
  const changesLegacyData = legacyFields.some((field) =>
    Object.prototype.hasOwnProperty.call(data, field)
  );

  if (actual.detalles.length > 0 && changesLegacyData) {
    throw createHttpError(
      409,
      "Una venta estructurada no permite modificar items o total directamente"
    );
  }

  const venta = await prisma.venta.update({
    where: { id },
    data,
    include: {
      usuario: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          username: true,
          rol: true
        }
      },
      detalles: true
    }
  });

  return normalizeSale(venta);
}

export {
  buildSaleNumber,
  buildSaleProductCode,
  buildSaleCancelWhere,
  buildLegacyStructuredSale,
  calculateSaleTotal,
  buildConsumption,
  listSaleProducts,
  getSaleProductById,
  createSaleProduct,
  updateSaleProduct,
  deactivateSaleProduct,
  listSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
