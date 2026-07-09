# GA8-220501096-AA1-EV01 - Reporte de validación Frontend React

## Proyecto

MLBT - María La Bonita Taquería.

## Evidencia

GA8-220501096-AA1-EV01 - Desarrollar software a partir de la integración de sus módulos componentes.

## Módulo validado

01_FRONT_END/01_REACT_AP07

## Ambiente local utilizado

| Elemento | Valor |
|---|---|
| Framework frontend | React |
| Herramienta de construcción | Vite |
| Estilos | Tailwind CSS |
| Componentes UI | shadcn/ui y componentes propios del proyecto |
| Ruteo | react-router-dom |
| Gestor de paquetes | pnpm |
| URL local | http://localhost:5173 |

## Comandos ejecutados

`powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
pnpm install
pnpm lint
pnpm build
pnpm dev
`",
  ",

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| Instalación de dependencias | Dependencias disponibles | pnpm install ejecutado correctamente | Aprobado |
| Revisión de código | Sin errores de lint | pnpm lint sin errores reportados | Aprobado |
| Compilación de producción | Build generado correctamente | pnpm build generó carpeta dist | Aprobado |
| Ejecución local | Aplicación disponible en navegador | React disponible en http://localhost:5173/login | Aprobado |

## Rutas funcionales disponibles

| Ruta | Propósito |
|---|---|
| /login | Inicio de sesión del panel administrativo. |
| /dashboard | Panel principal del sistema. |
| /usuarios | Gestión de usuarios. |
| /inventario | Gestión de inventario. |
| /ventas | Gestión de ventas. |

## Estado actual frente a la integración

El Frontend React se ejecuta correctamente, compila para producción y presenta el módulo de login. En esta etapa, la aplicación conserva datos mock locales para usuarios, inventario y ventas.

## Pendiente técnico de integración

Para completar la integración solicitada en la evidencia, el siguiente paso es conectar el login del Frontend React con el endpoint real POST /api/auth/login de la API Node y consumir el perfil autenticado mediante GET /api/auth/profile.

## Resultado general

El módulo Frontend React queda validado localmente como componente funcional del proyecto MLBT, listo para el ajuste de integración con la API Node.
