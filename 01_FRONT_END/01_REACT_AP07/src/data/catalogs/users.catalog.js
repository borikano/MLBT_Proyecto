// Catalogos estaticos de presentacion del modulo Usuarios.
// No contienen registros de usuarios ni sustituyen a la API.

export const rolesUsuarios = [
  {
    value: "ADMIN_APP",
    label: "Administrador del sistema",
    prefix: "ADM",
  },
  {
    value: "ADMIN_TIENDA",
    label: "Administrador de tienda",
    prefix: "ADT",
  },
  {
    value: "MESERO",
    label: "Mesero",
    prefix: "MES",
  },
  {
    value: "COCINA",
    label: "Cocinero",
    prefix: "COC",
  },
  {
    value: "BODEGA",
    label: "Bodega",
    prefix: "BOD",
  },
  {
    value: "CAJERO",
    label: "Cajero",
    prefix: "CAJ",
  },
  {
    value: "LECTURA",
    label: "Solo lectura",
    prefix: "LEC",
  },
]

export const estadosUsuario = [
  "Activo",
  "Pendiente de aprobación",
  "Pendiente de baja",
  "Retirado",
  "Inactivo",
]
