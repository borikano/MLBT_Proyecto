import { prisma } from "../config/prisma.js";
import { createHttpError } from "../utils/http-error.js";
import { writeSensitiveAudit } from "./audit.service.js";

function buildInventoryWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
      { numeroRegistro: { contains: query.buscar } },
      { nombre: { contains: query.buscar } },
      { descripcion: { contains: query.buscar } },
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

function buildInventoryRegistrationNumber(id) {
  return `PRD-${String(id).padStart(6, "0")}`;
}

function buildMovementNumber(id) {
  return `MOV-${String(id).padStart(6, "0")}`;
}

function buildPublicInventory(producto) {
  return {
    ...producto,
    stock: Number(producto.stock),
    stockMin: Number(producto.stockMin)
  };
}

function buildPublicMovement(movimiento) {
  return {
    ...movimiento,
    cantidad: Number(movimiento.cantidad),
    stockAnterior: Number(movimiento.stockAnterior),
    stockNuevo: Number(movimiento.stockNuevo)
  };
}

async function findInventoryRecordById(id, client = prisma) {
  const producto = await client.productoInventario.findUnique({
    where: { id }
  });

  if (!producto) {
    throw createHttpError(404, "Producto de inventario no encontrado");
  }

  return producto;
}

async function listInventory(query = {}) {
  const productos = await prisma.productoInventario.findMany({
    where: buildInventoryWhere(query),
    orderBy: { id: "asc" }
  });

  const normalizados = productos.map(buildPublicInventory);

  if (query.stockBajo === true) {
    return normalizados.filter(
      (producto) => producto.stock <= producto.stockMin
    );
  }

  return normalizados;
}

async function getInventoryById(id) {
  const producto = await findInventoryRecordById(id);
  return buildPublicInventory(producto);
}

async function createInventory(data) {
  // Genera el numero estable despues de obtener el id persistido.
  const producto = await prisma.$transaction(async (tx) => {
    const creado = await tx.productoInventario.create({
      data: {
        numeroRegistro: null,
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        categoria: data.categoria,
        stock: data.stock,
        stockMin: data.stockMin,
        unidad: data.unidad,
        estado: data.estado
      }
    });

    return tx.productoInventario.update({
      where: { id: creado.id },
      data: {
        numeroRegistro: buildInventoryRegistrationNumber(creado.id)
      }
    });
  });

  return buildPublicInventory(producto);
}

async function updateInventory(id, data) {
  await findInventoryRecordById(id);

  const producto = await prisma.productoInventario.update({
    where: { id },
    data
  });

  return buildPublicInventory(producto);
}

async function deactivateInventory(id) {
  await findInventoryRecordById(id);

  const producto = await prisma.productoInventario.update({
    where: { id },
    data: { estado: "INACTIVO" }
  });

  return buildPublicInventory(producto);
}

function calculateNextStock(currentStock, tipo, cantidad) {
  if (tipo === "ENTRADA") {
    return currentStock + cantidad;
  }

  if (tipo === "SALIDA") {
    return currentStock - cantidad;
  }

  return currentStock + cantidad;
}

async function listInventoryMovements(query = {}) {
  const where = {};

  if (query.productoId) {
    where.productoId = query.productoId;
  }

  if (query.tipo) {
    where.tipo = query.tipo;
  }

  const movimientos = await prisma.movimientoInventario.findMany({
    where,
    include: {
      producto: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          unidad: true
        }
      },
      usuario: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          username: true
        }
      }
    },
    orderBy: { id: "desc" }
  });

  return movimientos.map(buildPublicMovement);
}

async function getInventoryMovementById(id) {
  const movimiento = await prisma.movimientoInventario.findUnique({
    where: { id },
    include: {
      producto: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          unidad: true
        }
      },
      usuario: {
        select: {
          id: true,
          numeroRegistro: true,
          nombre: true,
          username: true
        }
      }
    }
  });

  if (!movimiento) {
    throw createHttpError(404, "Movimiento de inventario no encontrado");
  }

  return buildPublicMovement(movimiento);
}

async function createInventoryMovement(data, usuarioId, auditContext = {}) {
  const movimiento = await prisma.$transaction(async (tx) => {
    const producto = await findInventoryRecordById(data.productoId, tx);

    if (producto.estado !== "ACTIVO") {
      throw createHttpError(
        409,
        "Solo se pueden registrar movimientos para productos activos"
      );
    }

    const stockAnterior = Number(producto.stock);
    const cantidad = Number(data.cantidad);
    const stockNuevo = calculateNextStock(stockAnterior, data.tipo, cantidad);

    if (stockNuevo < 0) {
      throw createHttpError(
        409,
        "El movimiento no puede dejar el stock en negativo"
      );
    }

    const creado = await tx.movimientoInventario.create({
      data: {
        numeroMovimiento: null,
        productoId: producto.id,
        tipo: data.tipo,
        cantidad,
        stockAnterior,
        stockNuevo,
        motivo: data.motivo,
        usuarioId: usuarioId || null
      }
    });

    const actualizado = await tx.movimientoInventario.update({
      where: { id: creado.id },
      data: {
        numeroMovimiento: buildMovementNumber(creado.id)
      },
      include: {
        producto: {
          select: {
            id: true,
            numeroRegistro: true,
            nombre: true,
            unidad: true
          }
        },
        usuario: {
          select: {
            id: true,
            numeroRegistro: true,
            nombre: true,
            username: true
          }
        }
      }
    });

    await tx.productoInventario.update({
      where: { id: producto.id },
      data: { stock: stockNuevo }
    });

        if (data.tipo === "AJUSTE") {
      await writeSensitiveAudit(tx, { ...auditContext, motivo: data.motivo, modulo: "inventory", accion: "adjusted", resultado: "SUCCESS", entidad: "ProductoInventario", entidadId: producto.id, metadata: { movementType: data.tipo } });
    }
    return actualizado;
  });

  return buildPublicMovement(movimiento);
}

export {
  buildInventoryWhere,
  buildInventoryRegistrationNumber,
  buildMovementNumber,
  calculateNextStock,
  listInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deactivateInventory,
  listInventoryMovements,
  getInventoryMovementById,
  createInventoryMovement
};
