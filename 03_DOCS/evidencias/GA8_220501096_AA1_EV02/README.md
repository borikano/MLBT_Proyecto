# GA8-220501096-AA1-EV02 - Módulos integrados

## Evidencia

Módulos integrados.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Presentar los módulos integrados del sistema MLBT, incluyendo código fuente versionado, URLs de ejecución, documentación de entradas y salidas, pruebas realizadas y resultados obtenidos.

## Documentos de entrega

| Documento | Descripción |
|---|---|
| [Módulos integrados](GA8_220501096_AA1_EV02_modulos_integrados.md) | Relación de módulos, tecnologías, ejecución y estado de integración. |
| [Entradas y salidas](GA8_220501096_AA1_EV02_entradas_salidas.md) | Datos de entrada y salida por módulo y componente. |
| [Reporte de pruebas](pruebas/GA8_220501096_AA1_EV02_reporte_pruebas_modulos_integrados.md) | Pruebas realizadas sobre API, frontend e integración. |

## Módulos principales

| Módulo | Ruta | Estado |
|---|---|---|
| Frontend React | ../../../01_FRONT_END/01_REACT_AP07 | Ejecuta localmente e integra login real con API. |
| API Node | ../../../02_BACK_END/01_API_NODE | Ejecuta localmente con JWT, Prisma y MySQL. |
| Base de datos | MySQL/MariaDB en XAMPP | Validada mediante Prisma, migración y seed. |
| Spring Web | ../../../02_BACK_END/02_SPRING_WEB | Módulo complementario disponible. |
| Java Web | ../../../02_BACK_END/03_JAVA_WEB | Módulo complementario disponible. |

## URLs de ejecución local validadas

| Servicio | URL | Estado |
|---|---|---|
| API Node | http://localhost:3001 | Validada localmente. |
| Health API | http://localhost:3001/api/health | Validada localmente. |
| Frontend React | http://localhost:5173 | Validado localmente. |
| Login React | http://localhost:5173/login | Validado localmente. |
| Dashboard React | http://localhost:5173/dashboard | Validado después de autenticación. |

## URLs públicas de despliegue

| Servicio | URL pública | Estado |
|---|---|---|
| Base de datos MySQL en nube | Pendiente de definir | Pendiente de despliegue. |
| API Node en Render u otra plataforma | Pendiente de definir | Pendiente de despliegue. |
| Frontend React en Vercel o Netlify | Pendiente de definir | Pendiente de despliegue. |

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | AdminApp123* |
| Rol | ADMIN_APP |

## Relación con EV01

La evidencia EV02 toma como base la integración funcional documentada en [GA8-220501096-AA1-EV01](../GA8_220501096_AA1_EV01/README.md).

## Resultado actual

Los módulos principales del proyecto MLBT quedan integrados y validados en ambiente local. Para cierre completo de despliegue público, se deben registrar las URLs finales de nube cuando se publiquen los servicios.
