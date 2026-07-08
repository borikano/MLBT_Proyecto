import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

async function upsertUsuario(usuario) {
  const passwordHash = await bcrypt.hash(usuario.password, saltRounds);

  return prisma.usuario.upsert({
    where: { username: usuario.username },
    update: {
      nombre: usuario.nombre,
      email: usuario.email,
      passwordHash,
      rol: usuario.rol,
      estado: "ACTIVO"
    },
    create: {
      nombre: usuario.nombre,
      username: usuario.username,
      email: usuario.email,
      passwordHash,
      rol: usuario.rol,
      estado: "ACTIVO"
    }
  });
}

async function upsertProducto(producto) {
  const existente = await prisma.productoInventario.findFirst({
    where: { nombre: producto.nombre }
  });

  if (existente) {
    return prisma.productoInventario.update({
      where: { id: existente.id },
      data: producto
    });
  }

  return prisma.productoInventario.create({
    data: producto
  });
}

async function main() {
  console.log("Cargando datos iniciales MLBT...");

  const adminApp = await upsertUsuario({
    nombre: "Administrador APP MLBT",
    username: "adminapp",
    email: "adminapp@mlbt.local",
    password: "AdminApp123*",
    rol: "ADMIN_APP"
  });

  const adminTienda = await upsertUsuario({
    nombre: "Administrador Tienda MLBT",
    username: "admintienda",
    email: "admintienda@mlbt.local",
    password: "AdminTienda123*",
    rol: "ADMIN_TIENDA"
  });

  await upsertUsuario({
    nombre: "Mesero Principal",
    username: "mesero",
    email: "mesero@mlbt.local",
    password: "Mesero123*",
    rol: "MESERO"
  });

  await upsertUsuario({
    nombre: "Cocina MLBT",
    username: "cocina",
    email: "cocina@mlbt.local",
    password: "Cocina123*",
    rol: "COCINA"
  });

  await upsertProducto({
    nombre: "Tortilla de maiz",
    descripcion: "Insumo base para preparacion de tacos.",
    stock: "120.00",
    unidad: "paquete",
    estado: "ACTIVO"
  });

  await upsertProducto({
    nombre: "Carne al pastor",
    descripcion: "Proteina principal para tacos al pastor.",
    stock: "35.00",
    unidad: "kilo",
    estado: "ACTIVO"
  });

  await upsertProducto({
    nombre: "Salsa roja",
    descripcion: "Salsa tradicional para acompanamientos.",
    stock: "20.00",
    unidad: "litro",
    estado: "ACTIVO"
  });

  await upsertProducto({
    nombre: "Queso mozzarella",
    descripcion: "Insumo para preparaciones especiales.",
    stock: "18.00",
    unidad: "kilo",
    estado: "ACTIVO"
  });

  const ventasActuales = await prisma.venta.count();

  if (ventasActuales === 0) {
    await prisma.venta.createMany({
      data: [
        {
          producto: "Orden de tacos",
          cantidad: 2,
          total: "24000.00",
          usuarioId: adminTienda.id
        },
        {
          producto: "Orden Pizza Mexicana",
          cantidad: 5,
          total: "360000.00",
          usuarioId: adminApp.id
        }
      ]
    });
  }

  const usuarios = await prisma.usuario.count();
  const productos = await prisma.productoInventario.count();
  const ventas = await prisma.venta.count();

  console.log("Datos iniciales MLBT cargados correctamente.");
  console.log({ usuarios, productos, ventas });
}

main()
  .catch((error) => {
    console.error("Error cargando datos iniciales:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
