import { PrismaClient } from "@prisma/client";

const mode = process.argv[2];
const adminUrl = process.env.MLBT_ADMIN_DATABASE_URL;
const tempDbName = process.env.MLBT_TEMP_DB_NAME;

if (!adminUrl) {
  throw new Error("MLBT_ADMIN_DATABASE_URL ausente");
}

if (!["snapshot", "create", "drop"].includes(mode)) {
  throw new Error("Modo no soportado");
}

if (mode !== "snapshot" && !/^[A-Za-z0-9_]+$/.test(tempDbName || "")) {
  throw new Error("Nombre de DB temporal invalido");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: adminUrl,
    },
  },
});

try {
  if (mode === "snapshot") {
    const [usuarios, inventario, ventas, movimientos, productosVenta, auditoria] =
      await Promise.all([
        prisma.usuario.count(),
        prisma.productoInventario.count(),
        prisma.venta.count(),
        prisma.movimientoInventario.count(),
        prisma.productoVenta.count(),
        prisma.auditEvent.count(),
      ]);

    console.log(
      JSON.stringify({
        usuarios,
        inventario,
        ventas,
        movimientos,
        productosVenta,
        auditoria,
      })
    );
  }

  if (mode === "create") {
    await prisma.$executeRawUnsafe(
      `CREATE DATABASE \`${tempDbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log("TEMP_DB_CREATED");
  }

  if (mode === "drop") {
    await prisma.$executeRawUnsafe(
      `DROP DATABASE IF EXISTS \`${tempDbName}\``
    );
    console.log("TEMP_DB_DROPPED");
  }
} finally {
  await prisma.$disconnect();
}