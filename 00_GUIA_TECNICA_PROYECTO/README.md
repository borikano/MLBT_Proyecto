# Guía técnica del proyecto MLBT

Panel de documentación técnica para revisión, mantenimiento y control de cambios del repositorio MLBT.

Repositorio: [README principal](../README.md)

## Baseline técnico vigente

| Control | Baseline |
|---|---|
| Release estable | `v1.1.0` |
| Rama principal | `Arawkano` |
| Runtime JavaScript | Node 24.x |
| Gestor de paquetes | pnpm 11.0.8 |
| Frontend React | 74/74 pruebas, ESLint PASS, build PASS |
| API Node | 63/63 pruebas, `pnpm check` PASS |
| Arquitectura pública | Vercel → Render → Aiven MySQL 8.4 |

Los secretos y credenciales productivas se administran fuera de Git. La existencia de servicios públicos no sustituye los gates formales de PROD-001 para autorizar un nuevo despliegue.

## Índice

| Documento | Propósito |
|---|---|
| [01_RESUMEN_TECNICO](01_RESUMEN_TECNICO.md) | Síntesis del proyecto y estado actual |
| [02_ESTRUCTURA_DEL_PROYECTO](02_ESTRUCTURA_DEL_PROYECTO.md) | Organización del repositorio |
| [03_COMANDOS_DE_EJECUCION](03_COMANDOS_DE_EJECUCION.md) | Comandos de ejecución y validación |
| [04_CODIGO_FUENTE_RELEVANTE](04_CODIGO_FUENTE_RELEVANTE.md) | Rutas de código relevantes |
| [05_EVIDENCIAS_Y_PRUEBAS](05_EVIDENCIAS_Y_PRUEBAS.md) | Validación y pruebas |
| [06_TRAZABILIDAD_GIT](06_TRAZABILIDAD_GIT.md) | Historial y trazabilidad Git |
| [07_CIERRE_TECNICO](07_CIERRE_TECNICO.md) | Estado técnico del proyecto |
| [08_FRONTEND_REACT_AP07](08_FRONTEND_REACT_AP07.md) | Documentación del frontend React |

## Acceso rápido a módulos

| Módulo | Enlace |
|---|---|
| Frontend React | [01_REACT_AP07](../01_FRONT_END/01_REACT_AP07/README.md) |
| API Node | [01_API_NODE](../02_BACK_END/01_API_NODE/README.md) |
| Spring Web | [02_SPRING_WEB](../02_BACK_END/02_SPRING_WEB/README.md) |
| Java Web | [03_JAVA_WEB](../02_BACK_END/03_JAVA_WEB/README.md) |
| Seguridad | [SECURITY.md](../SECURITY.md) |
| Estándares | [03_DOCS](../03_DOCS/README.md) |

## URLs públicas

| Servicio | URL |
|---|---|
| Frontend | https://mlbt-proyecto.vercel.app |
| Login | https://mlbt-proyecto.vercel.app/login |
| API | https://mlbt-proyecto.onrender.com |
| Health | https://mlbt-proyecto.onrender.com/api/health |

## Ruta de lectura sugerida

1. [01_RESUMEN_TECNICO.md](01_RESUMEN_TECNICO.md)
2. [02_ESTRUCTURA_DEL_PROYECTO.md](02_ESTRUCTURA_DEL_PROYECTO.md)
3. [03_COMANDOS_DE_EJECUCION.md](03_COMANDOS_DE_EJECUCION.md)
4. [05_EVIDENCIAS_Y_PRUEBAS.md](05_EVIDENCIAS_Y_PRUEBAS.md)
5. [07_CIERRE_TECNICO.md](07_CIERRE_TECNICO.md)

## Historial documental

Los registros históricos de validación se conservan en [03_DOCS/evidencias](../03_DOCS/evidencias/README.md) como archivo de referencia. No forman la navegación principal del producto.
