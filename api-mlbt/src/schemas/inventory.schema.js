import { z } from "zod";

const estados = ["ACTIVO", "INACTIVO"];

const inventoryIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const createInventorySchema = z.object({
  body: z.object({
    nombre: z.string().min(2).max(150),
    descripcion: z.string().max(255).optional().nullable(),
    stock: z.coerce.number().nonnegative(),
    unidad: z.string().min(2).max(40).default("unidad"),
    estado: z.enum(estados).default("ACTIVO")
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateInventorySchema = z.object({
  body: z.object({
    nombre: z.string().min(2).max(150).optional(),
    descripcion: z.string().max(255).optional().nullable(),
    stock: z.coerce.number().nonnegative().optional(),
    unidad: z.string().min(2).max(40).optional(),
    estado: z.enum(estados).optional()
  }),
  params: inventoryIdParams,
  query: z.object({}).optional()
});

const inventoryQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().optional(),
    estado: z.enum(estados).optional()
  }).optional()
});

const inventoryByIdSchema = z.object({
  body: z.object({}).optional(),
  params: inventoryIdParams,
  query: z.object({}).optional()
});

export { createInventorySchema, updateInventorySchema, inventoryQuerySchema, inventoryByIdSchema };
