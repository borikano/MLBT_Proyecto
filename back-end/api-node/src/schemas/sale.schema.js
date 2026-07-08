import { z } from "zod";

const saleIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const createSaleSchema = z.object({
  body: z.object({
    producto: z.string().min(2).max(150),
    cantidad: z.coerce.number().int().positive(),
    total: z.coerce.number().nonnegative(),
    usuarioId: z.coerce.number().int().positive().optional().nullable()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateSaleSchema = z.object({
  body: z.object({
    producto: z.string().min(2).max(150).optional(),
    cantidad: z.coerce.number().int().positive().optional(),
    total: z.coerce.number().nonnegative().optional(),
    usuarioId: z.coerce.number().int().positive().optional().nullable()
  }),
  params: saleIdParams,
  query: z.object({}).optional()
});

const saleQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().optional(),
    usuarioId: z.coerce.number().int().positive().optional()
  }).optional()
});

const saleByIdSchema = z.object({
  body: z.object({}).optional(),
  params: saleIdParams,
  query: z.object({}).optional()
});

export { createSaleSchema, updateSaleSchema, saleQuerySchema, saleByIdSchema };
