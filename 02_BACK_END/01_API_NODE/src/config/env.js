import dotenv from "dotenv";

dotenv.config({ quiet: true });

function buildConfig(envSource = process.env) {
  const env = envSource.NODE_ENV || "development";
  const isProduction = env === "production";
  const databaseUrl = envSource.DATABASE_URL || "";
  const frontendOrigin = envSource.FRONTEND_ORIGIN || "";
  const jwtSecret =
    envSource.JWT_SECRET ||
    (isProduction ? "" : "cambiar_este_valor_en_desarrollo_local");

  const missing = [];

  if (isProduction && !databaseUrl) {
    missing.push("DATABASE_URL");
  }

  if (isProduction && !jwtSecret) {
    missing.push("JWT_SECRET");
  }

  if (isProduction && (!frontendOrigin || frontendOrigin === "*")) {
    missing.push("FRONTEND_ORIGIN");
  }

  if (missing.length > 0) {
    throw new Error(
      `Configuracion insegura para produccion. Variables requeridas: ${missing.join(
        ", "
      )}`
    );
  }

  return {
    env,
    port: Number(envSource.PORT || 3001),
    databaseUrl,
    jwtSecret,
    jwtExpiresIn: envSource.JWT_EXPIRES_IN || "2h",
    bcryptSaltRounds: Number(envSource.BCRYPT_SALT_ROUNDS || 10),
    frontendOrigin
  };
}

const config = buildConfig();

export { config, buildConfig };
