import { z } from "zod";

const roles = ["ADMIN_APP", "ADMIN_TIENDA", "MESERO", "COCINA", "BODEGA", "CAJERO", "LECTURA"];
const estados = ["ACTIVO", "INACTIVO"];

const userIdParams = z.object({
  id: z.coerce.number().int().positive("El id debe ser positivo")
});

const createUserSchema = z.object({
  body: z.object({
    nombre: z.string().min(3).max(120),
    username: z.string().min(3).max(60),
    email: z.string().email().max(120).optional().nullable(),
    password: z.string().min(8).max(120),
    rol: z.enum(roles).default("MESERO"),
    estado: z.enum(estados).default("ACTIVO")
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const updateUserSchema = z.object({
  body: z.object({
    nombre: z.string().min(3).max(120).optional(),
    username: z.string().min(3).max(60).optional(),
    email: z.string().email().max(120).optional().nullable(),
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

export { createUserSchema, updateUserSchema, userQuerySchema, userByIdSchema };
