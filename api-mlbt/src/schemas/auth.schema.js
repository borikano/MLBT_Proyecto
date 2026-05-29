import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3, "El usuario debe tener minimo 3 caracteres"),
    password: z.string().min(6, "La contrasena debe tener minimo 6 caracteres")
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export { loginSchema };
