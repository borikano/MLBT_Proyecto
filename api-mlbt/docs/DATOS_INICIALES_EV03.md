# API MLBT - Datos iniciales EV03

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## Propósito

Documentar los datos iniciales utilizados para validar la API del proyecto MLBT.

## Usuarios iniciales

| Usuario | Rol | Uso |
|---|---|---|
| adminapp | ADMIN_APP | Administración general del sistema. |
| admintienda | ADMIN_TIENDA | Administración operativa de tienda. |
| mesero | MESERO | Operación de pedidos y ventas. |
| cocina | COCINA | Operación de cocina/KDS proyectado. |

## Productos iniciales

| Producto | Unidad | Uso |
|---|---|---|
| Tortilla de maiz | paquete | Insumo base. |
| Carne al pastor | kilo | Proteina principal. |
| Salsa roja | litro | Acompanamiento. |
| Queso mozzarella | kilo | Insumo complementario. |

## Ventas iniciales

| Producto | Cantidad | Propósito |
|---|---|---|
| Orden de tacos | 2 | Registro inicial de venta. |
| Orden Pizza Mexicana | 5 | Registro inicial de venta. |

## Credenciales locales de prueba

Estas credenciales son solo para entorno local de desarrollo.

| Usuario | Contraseña | Rol |
|---|---|---|
| adminapp | AdminApp123* | ADMIN_APP |
| admintienda | AdminTienda123* | ADMIN_TIENDA |
| mesero | Mesero123* | MESERO |
| cocina | Cocina123* | COCINA |

## Comando de carga

node prisma/seed.js

## Nota de seguridad

Las contraseñas no se almacenan en texto plano. El seed aplica hash mediante bcrypt antes de guardar los usuarios.

