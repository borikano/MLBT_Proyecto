import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3001),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "cambiar_este_valor_en_desarrollo_local",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10)
};

export { config };
