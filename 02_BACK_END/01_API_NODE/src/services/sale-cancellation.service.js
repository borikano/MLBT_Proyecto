import { prisma } from "../config/prisma.js";
import { createHttpError } from "../utils/http-error.js";
import {
  buildMovementNumber,
  buildSaleCancelWhere,
  normalizeSale
} from "../domain/sale.domain.js";
import { writeSensitiveAudit } from "./audit.service.js";
import { requireAuditReason } from "../security/audit-context.js";
async function deleteSale(id, usuarioId, auditContext = {}) {
  const venta = await prisma.$transaction(async (tx) => {
    const auditCancelReason = requireAuditReason(auditContext.motivo, "cancelacion de venta");
    // Reserva la anulacion de forma atomica antes de devolver existencias.
    const cancelResult = await tx.venta.updateMany({
      where: buildSaleCancelWhere(id),
      data: { estado: "ANULADA" }
    });

    if (cancelResult.count !== 1) {
      const existente = await tx.venta.findUnique({
        where: { id },
        select: { id: true }
      });

      if (!existente) {
        throw createHttpError(404, "Venta no encontrada");
      }

      throw createHttpError(409, "La venta ya se encuentra anulada");
    }

    const actual = await tx.venta.findUnique({
      where: { id },
      include: {
        movimientos: {
          where: { tipo: "SALIDA" }
        }
      }
    });

    for (const movimientoOriginal of actual.movimientos) {
      await tx.productoInventario.update({
        where: { id: movimientoOriginal.productoId },
        data: {
          stock: { increment: movimientoOriginal.cantidad }
        }
      });

      const producto = await tx.productoInventario.findUnique({
        where: { id: movimientoOriginal.productoId }
      });

      const stockNuevo = Number(producto.stock);
      const stockAnterior = stockNuevo - Number(movimientoOriginal.cantidad);

      const reverso = await tx.movimientoInventario.create({
        data: {
          numeroMovimiento: null,
          productoId: movimientoOriginal.productoId,
          tipo: "ENTRADA",
          cantidad: movimientoOriginal.cantidad,
          stockAnterior,
          stockNuevo,
          motivo: `Anulacion venta ${actual.numeroVenta || actual.id}`,
          usuarioId: usuarioId || null,
          ventaId: actual.id
        }
      });

      await tx.movimientoInventario.update({
        where: { id: reverso.id },
        data: {
          numeroMovimiento: buildMovementNumber(reverso.id)
        }
      });
    }

        await writeSensitiveAudit(tx, { ...auditContext, motivo: auditCancelReason, modulo: "sales", accion: "cancelled", resultado: "SUCCESS", entidad: "Venta", entidadId: actual.id });
    return tx.venta.findUnique({
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
        detalles: true
      }
    });
  });

  return normalizeSale(venta);
}
export { deleteSale };
