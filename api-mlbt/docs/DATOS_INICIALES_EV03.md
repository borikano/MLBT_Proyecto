# API MLBT - Datos iniciales EV03

## Proyecto

MLBT Project - Maria La Bonita Taqueria

## Evidencia

GA7-220501096-AA5-EV03 - Diseno y Desarrollo de servicios web - proyecto

## Proposito

Documentar los datos iniciales utilizados para validar la API del proyecto MLBT.

## Usuarios iniciales

| Usuario | Rol | Uso |
|---|---|---|
| adminapp | ADMIN_APP | Administracion general del sistema. |
| admintienda | ADMIN_TIENDA | Administracion operativa de tienda. |
| mesero | MESERO | Operacion de pedidos y ventas. |
| cocina | COCINA | Operacion de cocina/KDS proyectado. |

## Productos iniciales

| Producto | Unidad | Uso |
|---|---|---|
| Tortilla de maiz | paquete | Insumo base. |
| Carne al pastor | kilo | Proteina principal. |
| Salsa roja | litro | Acompanamiento. |
| Queso mozzarella | kilo | Insumo complementario. |

## Ventas iniciales

| Producto | Cantidad | Proposito |
|---|---|---|
| Orden de tacos | 2 | Registro inicial de venta. |
| Orden Pizza Mexicana | 5 | Registro inicial de venta. |

## Credenciales locales de prueba

Estas credenciales son solo para entorno local de desarrollo.

| Usuario | Contrasena | Rol |
|---|---|---|
| adminapp | AdminApp123* | ADMIN_APP |
| admintienda | AdminTienda123* | ADMIN_TIENDA |
| mesero | Mesero123* | MESERO |
| cocina | Cocina123* | COCINA |

## Comando de carga

node prisma/seed.js

## Nota de seguridad

Las contrasenas no se almacenan en texto plano. El seed aplica hash mediante bcrypt antes de guardar los usuarios.
