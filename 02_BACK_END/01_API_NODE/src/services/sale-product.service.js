import { prisma } from "../config/prisma.js";
import { createHttpError } from "../utils/http-error.js";
import {
  buildSaleProductCode,
  buildSaleProductWhere,
  normalizeSaleProduct
} from "../domain/sale.domain.js";
import { writeSensitiveAudit } from "./audit.service.js";
import { requireAuditReason } from "../security/audit-context.js";
async function validateRecipeInventory(tx, receta) {
  const ids = [...new Set(receta.map((item) => item.productoInventarioId))];

  const productos = await tx.productoInventario.findMany({
    where: {
      id: { in: ids }
    },
    select: {
      id: true,
      estado: true
    }
  });

  if (productos.length !== ids.length) {
    throw createHttpError(
      400,
      "La receta contiene productos de inventario inexistentes"
    );
  }

  if (productos.some((producto) => producto.estado !== "ACTIVO")) {
    throw createHttpError(
      409,
      "La receta solo puede usar productos de inventario activos"
    );
  }
}

async function listSaleProducts(query = {}) {
  const productos = await prisma.productoVenta.findMany({
    where: buildSaleProductWhere(query),
    include: {
      receta: {
        include: {
          productoInventario: {
            select: {
              id: true,
              numeroRegistro: true,
              nombre: true,
              unidad: true,
              estado: true
            }
          }
        }
      }
    },
    orderBy: { id: "asc" }
  });

  return productos.map(normalizeSaleProduct);
}

async function getSaleProductById(id) {
  const producto = await prisma.productoVenta.findUnique({
    where: { id },
    include: {
      receta: {
        include: {
          productoInventario: {
            select: {
              id: true,
              numeroRegistro: true,
              nombre: true,
              unidad: true,
              estado: true
            }
          }
        }
      }
    }
  });

  if (!producto) {
    throw createHttpError(404, "Producto de venta no encontrado");
  }

  return normalizeSaleProduct(producto);
}

async function createSaleProduct(data) {
  const producto = await prisma.$transaction(async (tx) => {
    await validateRecipeInventory(tx, data.receta);

    const creado = await tx.productoVenta.create({
      data: {
        codigo: null,
        nombre: data.nombre,
        categoria: data.categoria,
        precio: data.precio,
        estado: data.estado,
        receta: {
          create: data.receta.map((item) => ({
            productoInventarioId: item.productoInventarioId,
            cantidad: item.cantidad
          }))
        }
      }
    });

    return tx.productoVenta.update({
      where: { id: creado.id },
      data: {
        codigo: buildSaleProductCode(creado.id)
      },
      include: {
        receta: true
      }
    });
  });

  return normalizeSaleProduct(producto);
}

async function updateSaleProduct(id, data, auditContext = {}) {
  const { motivo: auditMotivo, ...businessData } = data;
  data = businessData;
  auditContext = { ...auditContext, motivo: auditContext.motivo || auditMotivo };
  const actual = await prisma.productoVenta.findUnique({
    where: { id }
  });

  if (!actual) {
    throw createHttpError(404, "Producto de venta no encontrado");
  }

  const producto = await prisma.$transaction(async (tx) => {
    const auditBeforeProduct = await tx.productoVenta.findUnique({ where: { id }, include: { receta: true } });
    if (data.receta) {
      await validateRecipeInventory(tx, data.receta);

      await tx.recetaProductoVenta.deleteMany({
        where: { productoVentaId: id }
      });

      await tx.recetaProductoVenta.createMany({
        data: data.receta.map((item) => ({
          productoVentaId: id,
          productoInventarioId: item.productoInventarioId,
          cantidad: item.cantidad
        }))
      });
    }

    const updateData = { ...data };
    delete updateData.receta;

    const auditUpdatedProduct = await tx.productoVenta.update({
      where: { id },
      data: updateData,
      include: {
        receta: true
      }
    });
    const priceChanged = data.precio !== undefined && auditBeforeProduct && Number(auditBeforeProduct.precio) !== Number(auditUpdatedProduct.precio);
    const beforeRecipe = (auditBeforeProduct?.receta || []).map((item) => [item.productoInventarioId, Number(item.cantidad)]).sort((a,b)=>a[0]-b[0]);
    const afterRecipe = (auditUpdatedProduct?.receta || []).map((item) => [item.productoInventarioId, Number(item.cantidad)]).sort((a,b)=>a[0]-b[0]);
    const recipeChanged = data.receta !== undefined && JSON.stringify(beforeRecipe) !== JSON.stringify(afterRecipe);
    if (priceChanged || recipeChanged) {
      const reason = requireAuditReason(auditContext.motivo, "cambio de precio o receta");
      if (priceChanged) await writeSensitiveAudit(tx, { ...auditContext, motivo: reason, modulo: "catalog", accion: "price_changed", resultado: "SUCCESS", entidad: "ProductoVenta", entidadId: id, metadata: { oldPrice: Number(auditBeforeProduct.precio), newPrice: Number(auditUpdatedProduct.precio) } });
      if (recipeChanged) await writeSensitiveAudit(tx, { ...auditContext, motivo: reason, modulo: "catalog", accion: "recipe_changed", resultado: "SUCCESS", entidad: "ProductoVenta", entidadId: id, metadata: { recipeChanged: true } });
    }
    return auditUpdatedProduct;
  });

  return normalizeSaleProduct(producto);
}

async function deactivateSaleProduct(id) {
  await getSaleProductById(id);

  const producto = await prisma.productoVenta.update({
    where: { id },
    data: { estado: "INACTIVO" },
    include: {
      receta: true
    }
  });

  return normalizeSaleProduct(producto);
}
export {
  listSaleProducts,
  getSaleProductById,
  createSaleProduct,
  updateSaleProduct,
  deactivateSaleProduct
};
