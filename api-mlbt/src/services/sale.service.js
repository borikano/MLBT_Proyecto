import { prisma } from "../config/prisma.js";
import { createHttpError } from "../utils/http-error.js";

function buildSaleWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.producto = { contains: query.buscar };
  }

  if (query.usuarioId) {
    where.usuarioId = query.usuarioId;
  }

  return where;
}

async function listSales(query = {}) {
  return prisma.venta.findMany({
    where: buildSaleWhere(query),
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          username: true,
          rol: true
        }
      }
    },
    orderBy: { id: "asc" }
  });
}

async function getSaleById(id) {
  const venta = await prisma.venta.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          username: true,
          rol: true
        }
      }
    }
  });

  if (!venta) {
    throw createHttpError(404, "Venta no encontrada");
  }

  return venta;
}

async function createSale(data) {
  return prisma.venta.create({
    data: {
      producto: data.producto,
      cantidad: data.cantidad,
      total: data.total,
      usuarioId: data.usuarioId || null
    }
  });
}

async function updateSale(id, data) {
  await getSaleById(id);

  return prisma.venta.update({
    where: { id },
    data
  });
}

async function deleteSale(id) {
  await getSaleById(id);

  return prisma.venta.delete({
    where: { id }
  });
}

export { listSales, getSaleById, createSale, updateSale, deleteSale };
