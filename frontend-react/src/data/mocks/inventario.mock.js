export const categoriasInventario = [
  "Tortillas",
  "Proteínas",
  "Lácteos",
  "Vegetales",
  "Salsas",
  "Bebidas",
  "Empaques",
  "Otros",
]

export const unidadesInventario = [
  "unidad",
  "kg",
  "g",
  "litro",
  "ml",
  "paquete",
  "caja",
]

export const estadosInventario = ["Activo", "Inactivo"]

export const tiposMovimientoInventario = [
  {
    value: "entrada",
    label: "Entrada",
  },
  {
    value: "salida",
    label: "Salida",
  },
  {
    value: "ajuste",
    label: "Ajuste",
  },
]

export const inventarioMock = [
  {
    id: 1,
    registrationNumber: "PRD-0001",
    nombre: "Tortilla de maíz",
    categoria: "Tortillas",
    unidad: "paquete",
    stock: 25,
    stockMin: 8,
    estado: "Activo",
    createdAt: "2026-06-18",
    updatedAt: "2026-06-18",
  },
  {
    id: 2,
    registrationNumber: "PRD-0002",
    nombre: "Carne al pastor",
    categoria: "Proteínas",
    unidad: "kg",
    stock: 12,
    stockMin: 5,
    estado: "Activo",
    createdAt: "2026-06-18",
    updatedAt: "2026-06-18",
  },
  {
    id: 3,
    registrationNumber: "PRD-0003",
    nombre: "Queso mozzarella",
    categoria: "Lácteos",
    unidad: "kg",
    stock: 4,
    stockMin: 4,
    estado: "Activo",
    createdAt: "2026-06-18",
    updatedAt: "2026-06-18",
  },
  {
    id: 4,
    registrationNumber: "PRD-0004",
    nombre: "Gaseosa personal",
    categoria: "Bebidas",
    unidad: "unidad",
    stock: 30,
    stockMin: 10,
    estado: "Activo",
    createdAt: "2026-06-18",
    updatedAt: "2026-06-18",
  },
]

export const movimientosInventarioMock = [
  {
    id: 1,
    movementNumber: "MOV-0001",
    itemId: 1,
    itemRegistrationNumber: "PRD-0001",
    itemName: "Tortilla de maíz",
    tipo: "entrada",
    tipoLabel: "Entrada",
    cantidad: 25,
    stockAnterior: 0,
    stockNuevo: 25,
    motivo: "Carga inicial de inventario",
    fecha: "2026-06-18",
    usuarioId: "system-local",
  },
  {
    id: 2,
    movementNumber: "MOV-0002",
    itemId: 2,
    itemRegistrationNumber: "PRD-0002",
    itemName: "Carne al pastor",
    tipo: "entrada",
    tipoLabel: "Entrada",
    cantidad: 12,
    stockAnterior: 0,
    stockNuevo: 12,
    motivo: "Carga inicial de inventario",
    fecha: "2026-06-18",
    usuarioId: "system-local",
  },
]
