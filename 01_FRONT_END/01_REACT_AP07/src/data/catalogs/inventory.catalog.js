// Catalogos estaticos de presentacion del modulo Inventario.
// Stock, productos y movimientos reales pertenecen a la API.

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
