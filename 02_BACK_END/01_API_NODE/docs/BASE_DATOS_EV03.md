# API MLBT - Base de datos EV03

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## Motor de base de datos

MySQL / MariaDB mediante XAMPP.

## Base de datos local

mlbt_api_ga7_aa5_ev03

## ORM

Prisma ORM.

## Modelos iniciales

| Modelo | Tabla | Propósito |
|---|---|---|
| Usuario | usuarios | Gestión de usuarios, autenticación y roles. |
| ProductoInventario | productos_inventario | Gestión de productos e inventario base. |
| Venta | ventas | Registro inicial de ventas del sistema. |

## Roles proyectados

- ADMIN_APP
- ADMIN_TIENDA
- MESERO
- COCINA
- BODEGA
- CAJERO
- LECTURA

## Comandos principales

Generar Prisma Client:

.\node_modules\.bin\prisma.cmd generate

Crear migracion inicial:

.\node_modules\.bin\prisma.cmd migrate dev --name init_api_mlbt

Abrir Prisma Studio:

.\node_modules\.bin\prisma.cmd studio
