import { z } from "zod";

const estados = ["ACTIVO", "INACTIVO"];
const tiposMovimiento = ["ENTRADA", "SALIDA", "AJUSTE"];

const inventoryIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const movementIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const createInventorySchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(2).max(150),
    descripcion: z.string().trim().max(255).optional().nullable(),
    categoria: z.string().trim().min(2).max(60).default("General"),
    stock: z.coerce.number().nonnegative().default(0),
    stockMin: z.coerce.number().nonnegative().default(0),
    unidad: z.string().trim().min(1).max(40).default("unidad"),
    estado: z.enum(estados).default("ACTIVO")
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateInventorySchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(2).max(150).optional(),
    descripcion: z.string().trim().max(255).optional().nullable(),
    categoria: z.string().trim().min(2).max(60).optional(),
    stock: z.coerce.number().nonnegative().optional(),
    stockMin: z.coerce.number().nonnegative().optional(),
    unidad: z.string().trim().min(1).max(40).optional(),
    estado: z.enum(estados).optional()
  }),
  params: inventoryIdParams,
  query: z.object({}).optional()
});

const inventoryQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().trim().optional(),
    categoria: z.string().trim().optional(),
    estado: z.enum(estados).optional(),
    stockBajo: z.enum(["true", "false"])
      .transform((value) => value === "true")
      .optional()
  }).optional()
});

const inventoryByIdSchema = z.object({
  body: z.object({}).optional(),
  params: inventoryIdParams,
  query: z.object({}).optional()
});

const createInventoryMovementSchema = z.object({
  body: z.object({
    productoId: z.coerce.number().int().positive(),
    tipo: z.enum(tiposMovimiento),
    cantidad: z.coerce.number(),
    motivo: z.string().trim().min(2).max(255)
  }).superRefine((data, ctx) => {
    if ((data.tipo === "ENTRADA" || data.tipo === "SALIDA") && data.cantidad <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cantidad"],
        message: "Entrada y salida requieren una cantidad positiva"
      });
    }

    if (data.tipo === "AJUSTE" && data.cantidad === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cantidad"],
        message: "El ajuste requiere una cantidad diferente de cero"
      });
    }
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const inventoryMovementQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    productoId: z.coerce.number().int().positive().optional(),
    tipo: z.enum(tiposMovimiento).optional()
  }).optional()
});

const inventoryMovementByIdSchema = z.object({
  body: z.object({}).optional(),
  params: movementIdParams,
  query: z.object({}).optional()
});

export {
  createInventorySchema,
  updateInventorySchema,
  inventoryQuerySchema,
  inventoryByIdSchema,
  createInventoryMovementSchema,
  inventoryMovementQuerySchema,
  inventoryMovementByIdSchema
};
