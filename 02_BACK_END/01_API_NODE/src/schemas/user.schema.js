import { z } from "zod";

const roles = ["ADMIN_APP", "ADMIN_TIENDA", "MESERO", "COCINA", "BODEGA", "CAJERO", "LECTURA"];
const estados = ["ACTIVO", "PENDIENTE_APROBACION", "PENDIENTE_BAJA", "RETIRADO", "INACTIVO"];

const userIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const createUserBodySchema = z.object({
  nombre: z.string().trim().min(3).max(120).optional(),
  nombres: z.string().trim().min(2).max(80).optional(),
  apellidos: z.string().trim().min(2).max(80).optional(),
  documento: z.string().trim().min(5).max(30).optional(),
  telefono: z.string().trim().min(7).max(30).optional(),
  username: z.string().trim().min(3).max(60),
  email: z.string().trim().email().max(120).optional().nullable(),
  password: z.string().min(8).max(120),
  rol: z.enum(roles).default("MESERO"),
  estado: z.enum(estados).default("ACTIVO")
}).superRefine((data, ctx) => {
  const hasLegacyName = Boolean(data.nombre);
  const hasStructuredName = Boolean(data.nombres && data.apellidos);

  // Permite clientes v1.0 y habilita el contrato estructurado usado por el frontend.
  if (!hasLegacyName && !hasStructuredName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["nombres"],
      message: "Debe enviar nombre o nombres y apellidos"
    });
  }
});

const createUserSchema = z.object({
  body: createUserBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateUserSchema = z.object({
  body: z.object({
    motivo: z.string().trim().min(3).max(255).optional(),
    nombre: z.string().trim().min(3).max(120).optional(),
    nombres: z.string().trim().min(2).max(80).optional(),
    apellidos: z.string().trim().min(2).max(80).optional(),
    documento: z.string().trim().min(5).max(30).optional(),
    telefono: z.string().trim().min(7).max(30).optional(),
    username: z.string().trim().min(3).max(60).optional(),
    email: z.string().trim().email().max(120).optional().nullable(),
    password: z.string().min(8).max(120).optional(),
    rol: z.enum(roles).optional(),
    estado: z.enum(estados).optional()
  }),
  params: userIdParams,
  query: z.object({}).optional()
});

const userQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    buscar: z.string().optional(),
    rol: z.enum(roles).optional(),
    estado: z.enum(estados).optional()
  }).optional()
});

const userByIdSchema = z.object({
  body: z.object({}).optional(),
  params: userIdParams,
  query: z.object({}).optional()
});

const deactivateUserSchema = z.object({
  body: z.object({ motivo: z.string().trim().min(3).max(255) }),
  params: userIdParams,
  query: z.object({}).optional()
});

export { createUserSchema, updateUserSchema, userQuerySchema, userByIdSchema, deactivateUserSchema };