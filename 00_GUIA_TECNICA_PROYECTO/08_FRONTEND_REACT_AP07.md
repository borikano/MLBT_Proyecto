# Interfaz React AP07 - MLBT

## Referencia histórica

El identificador histórico asociado al módulo es GA7-220501096-AA4-EV03.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Documentar la implementación del componente de interfaz React de MLBT, manteniendo trazabilidad técnica para revisión, ejecución local, mantenimiento y validación.

## Alcance implementado

- Inicio de sesión de prueba.
- Panel principal administrativo.
- Calendario de análisis en el panel principal.
- Gestión de usuarios.
- Gestión de inventario.
- Gestión de ventas.
- Validación de existencias.
- Registro de movimientos.
- Pedido actual.
- Historial de ventas.
- Navegación lateral fija.
- Enlaces internos por sección.
- Roles administrativos.
- Datos de prueba compartidos.

## Ruta del módulo

    01_FRONT_END/01_REACT_AP07

## Rutas funcionales

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

## Credenciales de prueba

    Usuario: admin
    Contraseña: admin

## Tecnologías utilizadas

- ReactJS.
- Vite.
- JavaScript.
- Tailwind CSS.
- shadcn/ui.
- Radix UI.
- TanStack Table.
- react-router-dom.
- pnpm.

## Ejecución local

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
    pnpm install
    pnpm dev

## Validación técnica

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
    pnpm lint
    pnpm build


## Resultado

El componente de interfaz queda funcional con datos de prueba, navegación de una sola página, componentes reutilizables, formularios controlados, tablas de datos, validaciones visuales y estructura lista para integración posterior con el servidor.
