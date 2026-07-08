import { prisma } from "../config/prisma.js";
import { createHttpError } from "../utils/http-error.js";

function buildInventoryWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
      { nombre: { contains: query.buscar } },
      { descripcion: { contains: query.buscar } }
    ];
  }

  if (query.estado) {
    where.estado = query.estado;
  }

  return where;
}

async function listInventory(query = {}) {
  return prisma.productoInventario.findMany({
    where: buildInventoryWhere(query),
    orderBy: { id: "asc" }
  });
}

async function getInventoryById(id) {
  const producto = await prisma.productoInventario.findUnique({
    where: { id }
  });

  if (!producto) {
    throw createHttpError(404, "Producto de inventario no encontrado");
  }

  return producto;
}

async function createInventory(data) {
  return prisma.productoInventario.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      stock: data.stock,
      unidad: data.unidad,
      estado: data.estado
    }
  });
}

async function updateInventory(id, data) {
  await getInventoryById(id);

  return prisma.productoInventario.update({
    where: { id },
    data
  });
}

async function deactivateInventory(id) {
  await getInventoryById(id);

  return prisma.productoInventario.update({
    where: { id },
    data: { estado: "INACTIVO" }
  });
}

export { listInventory, getInventoryById, createInventory, updateInventory, deactivateInventory };
