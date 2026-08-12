# MLBT - María La Bonita Taquería

Plataforma full-stack para la gestión administrativa de María La Bonita Taquería: panel web, API REST, validación automatizada y despliegue en Vercel y Render.

[![CI](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml/badge.svg?branch=Arawkano)](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-44%2F44-brightgreen)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Security](https://img.shields.io/badge/security-controls%20verified-blue)
![Dependencies](https://img.shields.io/badge/dependencies-monitored-informational)
![License](https://img.shields.io/badge/license-MIT-blue)

## Demo / endpoints

| Recurso | URL | Verificación (2026-08-11) |
|---|---|---|
| Frontend | https://mlbt-proyecto.vercel.app | HTTP 200 |
| Login | https://mlbt-proyecto.vercel.app/login | HTTP 200 |
| API | https://mlbt-proyecto.onrender.com | HTTP 200 |
| Health | https://mlbt-proyecto.onrender.com/api/health | HTTP 200 |

Las credenciales de validación se gestionan fuera del repositorio. El acceso autenticado al dashboard no se verifica en documentación pública.

## Descripción del producto

MLBT centraliza operaciones administrativas de la taquería: autenticación, panel de control, usuarios, inventario y ventas. El frontend React consume la API Node sobre MySQL; los módulos Java (Spring Web y Java Web) son complementarios de referencia y no forman el backend productivo principal.

## Funcionalidades principales

| Área | Capacidades |
|---|---|
| Autenticación | Login JWT contra API Node, rutas protegidas en frontend |
| Dashboard | Panel administrativo con métricas y accesos rápidos |
| Usuarios | Resumen, creación, listado y gestión de roles |
| Inventario | Registro, movimientos, tablas y control de existencias |
| Ventas | Pedido actual, historial y análisis |
| API | Endpoints REST con validación de entrada (Zod), health público |
| Calidad | 44 pruebas automatizadas, lint, build y CI |

## Arquitectura

```mermaid
flowchart TB
  User[Usuario]
  subgraph vercel [Vercel]
    FE[Frontend React / Vite]
  end
  subgraph render [Render]
    API[API Node / Express / Prisma]
  end
  subgraph aiven [Aiven]
    DB[(MySQL 8.4)]
  end
  subgraph reference [Componentes complementarios]
    Spring[Spring Web]
    JavaWeb[Java Web JSP/Servlets]
  end
  User --> FE
  FE -->|HTTPS + JWT| API
  API --> DB
```

## Stack tecnológico

Versiones declaradas en `package.json`, `pom.xml` y lockfiles:

| Capa | Tecnologías |
|---|---|
| Frontend | React ^19.2.8, Vite ^8.1.5, Vitest 4.1.10, react-router-dom 7.18.1, TanStack Table 8.21.3, Tailwind CSS 4.3.3 |
| API | Node >=20, Express 5.2.1, Prisma 6.19.3, JWT, Zod |
| Datos | MySQL 8.4 (Aiven en producción) |
| Java complementario | Spring Boot 4.1.0 (Java 17), Java Web WAR (Java 11), JUnit 6.1.2 |
| Calidad | GitHub Actions, Dependabot, ESLint |

## Validación de calidad

### Pruebas automatizadas

| Módulo | Resultado |
|---|---|
| Frontend React | 15/15 |
| API Node | 23/23 |
| Spring Web | 3/3 |
| Java Web | 3/3 |
| **Total** | **44/44** |

### Frontend

- ESLint: PASS
- Build de producción: PASS
- Chunk entry: **256.26 kB** (gzip **80.77 kB**)
- Carga diferida por rutas (`React.lazy` / `Suspense`)
- Sin warning Vite >500 kB en la última validación

### Java Web

- Procedimiento local: `test.cmd` y `package.cmd`
- WAR generado correctamente
- Maven global no requerido para el flujo local documentado

> Referencia de calidad: ISO/IEC 25010 se utiliza como modelo de referencia, no como certificación.

## Instalación y ejecución local

### Frontend

```powershell
Set-Location ".\01_FRONT_END\01_REACT_AP07"
pnpm install
pnpm dev
```

Local: http://localhost:5173

### API Node

```powershell
Set-Location ".\02_BACK_END\01_API_NODE"
pnpm install
pnpm run dev
```

Local: http://localhost:3001 — requiere MySQL local y variables en `.env.example`.

### Spring Web

```powershell
.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml spring-boot:run
```

Local: http://localhost:8082

## Pruebas y validación

```powershell
# Frontend
Set-Location ".\01_FRONT_END\01_REACT_AP07"
pnpm test:run
pnpm lint
pnpm build

# API
Set-Location ".\02_BACK_END\01_API_NODE"
pnpm test
pnpm check

# Spring Web
.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test

# Java Web
.\02_BACK_END\03_JAVA_WEB\test.cmd
.\02_BACK_END\03_JAVA_WEB\package.cmd
```

## Despliegue

| Componente | Plataforma | URL |
|---|---|---|
| Frontend React | Vercel | https://mlbt-proyecto.vercel.app |
| API Node | Render | https://mlbt-proyecto.onrender.com |
| Base de datos | Aiven MySQL 8.4 | Variable de entorno segura en Render |

Secretos, tokens y cadenas de conexión no se versionan. Configuración mediante variables de entorno en cada plataforma.

> Prisma se mantiene en la línea 6.x. La migración a Prisma 7 requiere ajuste explícito del datasource y validación de conexión real.

## Seguridad

- Política: [SECURITY.md](SECURITY.md)
- Estándares y controles: [03_DOCS/seguridad-pruebas-calidad.md](03_DOCS/seguridad-pruebas-calidad.md)
- `.env` no versionado; plantillas en `.env.example`
- CORS, JWT y validación de entrada documentados en la API

## Estructura del repositorio

| Ruta | Propósito |
|---|---|
| [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) | Frontend administrativo (productivo) |
| [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) | API REST principal |
| [02_BACK_END/02_SPRING_WEB](02_BACK_END/02_SPRING_WEB) | Módulo Spring Boot complementario |
| [02_BACK_END/03_JAVA_WEB](02_BACK_END/03_JAVA_WEB) | Módulo Java Web complementario |
| [01_FRONT_END/02_INTERFAZ_BASE](01_FRONT_END/02_INTERFAZ_BASE) | Prototipo estático histórico |
| [00_GUIA_TECNICA_PROYECTO](00_GUIA_TECNICA_PROYECTO) | Documentación técnica del proyecto |
| [03_DOCS](03_DOCS) | Estándares, seguridad e historial documental |

## Documentación técnica

| Documento | Contenido |
|---|---|
| [Guía técnica](00_GUIA_TECNICA_PROYECTO/README.md) | Índice y panel de revisión |
| [Comandos](00_GUIA_TECNICA_PROYECTO/03_COMANDOS_DE_EJECUCION.md) | Ejecución y validación |
| [Validación y pruebas](00_GUIA_TECNICA_PROYECTO/05_EVIDENCIAS_Y_PRUEBAS.md) | Matriz QA y comandos |
| [Estado técnico](00_GUIA_TECNICA_PROYECTO/07_CIERRE_TECNICO.md) | Consolidación del proyecto |
| [Frontend](01_FRONT_END/01_REACT_AP07/README.md) | Módulo React |
| [API](02_BACK_END/01_API_NODE/README.md) | Módulo Node |
| [Historial documental](03_DOCS/evidencias/README.md) | Registros históricos (archivo) |

## Mantenimiento y dependencias

- **CI:** workflow `CI` en push y pull request (Node 20, pnpm 10, Java 17, Maven).
- **Dependabot:** actualizaciones semanales; majors de Prisma bloqueados en CI.
- **Última ejecución CI en `Arawkano`:** aprobada para HEAD `41bca42`.

## Mejoras técnicas recientes

### Optimización del bundle frontend

- Carga diferida por rutas con `React.lazy` y `Suspense`
- Chunk entry: 509.80 kB → **256.26 kB**
- Gzip: 151.23 kB → **80.77 kB**
- Warning Vite >500 kB resuelto

### Reproducibilidad Java Web

- Scripts `test.cmd` y `package.cmd` como interfaz canónica
- Reutilización del Maven Wrapper de Spring Web
- 3/3 pruebas JUnit en flujo local documentado

## Licencia

Distribuido bajo [MIT License](LICENSE.md). Los datos de prueba deben mantenerse anonimizados.
