import { z } from "zod";

import {
  tiposVenta,
  segmentosPago,
  metodosPorSegmento,
  isValidPaymentMethod
} from "../constants/sale.constants.js";

const saleIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const saleProductIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const recipeItemSchema = z.object({
  productoInventarioId: z.coerce.number().int().positive(),
  cantidad: z.coerce.number().positive()
});

const createSaleProductSchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(2).max(150),
    categoria: z.string().trim().min(2).max(60).default("General"),
    precio: z.coerce.number().positive(),
    estado: z.enum(["ACTIVO", "INACTIVO"]).default("ACTIVO"),
    receta: z.array(recipeItemSchema).min(1)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateSaleProductSchema = z.object({
  body: z.object({
    motivo: z.string().trim().min(3).max(255).optional(),
    nombre: z.string().trim().min(2).max(150).optional(),
    categoria: z.string().trim().min(2).max(60).optional(),
    precio: z.coerce.number().positive().optional(),
    estado: z.enum(["ACTIVO", "INACTIVO"]).optional(),
    receta: z.array(recipeItemSchema).min(1).optional()
  }),
  params: saleProductIdParams,
  query: z.object({}).optional()
});

const saleProductQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().trim().optional(),
    categoria: z.string().trim().optional(),
    estado: z.enum(["ACTIVO", "INACTIVO"]).optional()
  }).optional()
});

const saleProductByIdSchema = z.object({
  body: z.object({}).optional(),
  params: saleProductIdParams,
  query: z.object({}).optional()
});

const structuredSaleBodySchema = z.object({
  cliente: z.string().trim().min(2).max(120),
  tipoVenta: z.enum(tiposVenta),
  metodoPagoSegmento: z.enum(segmentosPago),
  metodoPago: z.string().trim().min(2).max(60),
  items: z.array(
    z.object({
      productoId: z.coerce.number().int().positive(),
      cantidad: z.coerce.number().int().positive()
    })
  ).min(1)
}).superRefine((data, ctx) => {
  if (!isValidPaymentMethod(data.metodoPagoSegmento, data.metodoPago)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["metodoPago"],
      message: "El metodo de pago no corresponde al segmento seleccionado"
    });
  }
});

const legacySaleBodySchema = z.object({
  producto: z.string().trim().min(2).max(150),
  cantidad: z.coerce.number().int().positive(),
  total: z.coerce.number().nonnegative(),
  usuarioId: z.coerce.number().int().positive().optional().nullable()
});

const createSaleSchema = z.object({
  body: z.union([structuredSaleBodySchema, legacySaleBodySchema]),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateSaleSchema = z.object({
  body: z.object({
    cliente: z.string().trim().min(2).max(120).optional(),
    tipoVenta: z.enum(tiposVenta).optional(),
    metodoPagoSegmento: z.enum(segmentosPago).optional(),
    metodoPago: z.string().trim().min(2).max(60).optional(),
    producto: z.string().trim().min(2).max(150).optional(),
    cantidad: z.coerce.number().int().positive().optional(),
    total: z.coerce.number().nonnegative().optional()
  }).superRefine((data, ctx) => {
    if (data.metodoPagoSegmento && data.metodoPago) {
      if (!isValidPaymentMethod(data.metodoPagoSegmento, data.metodoPago)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["metodoPago"],
          message: "El metodo de pago no corresponde al segmento seleccionado"
        });
      }
    }
  }),
  params: saleIdParams,
  query: z.object({}).optional()
});

const saleQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().trim().optional(),
    tipoVenta: z.enum(tiposVenta).optional(),
    metodoPagoSegmento: z.enum(segmentosPago).optional(),
    estado: z.enum(["CONFIRMADA", "ANULADA"]).optional(),
    usuarioId: z.coerce.number().int().positive().optional()
  }).optional()
});

const saleByIdSchema = z.object({
  body: z.object({}).optional(),
  params: saleIdParams,
  query: z.object({}).optional()
});

const cancelSaleSchema = z.object({
  body: z.object({ motivo: z.string().trim().min(3).max(255) }),
  params: saleIdParams,
  query: z.object({}).optional()
});

export { tiposVenta,
  segmentosPago,
  metodosPorSegmento,
  createSaleSchema,
  updateSaleSchema,
  saleQuerySchema,
  saleByIdSchema,
  createSaleProductSchema,
  updateSaleProductSchema,
  saleProductQuerySchema,
  saleProductByIdSchema, cancelSaleSchema };