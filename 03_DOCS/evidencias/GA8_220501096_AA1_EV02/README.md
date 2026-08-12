# GA8-220501096-AA1-EV02 - Módulos integrados

## Evidencia

Módulos integrados.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Presentar los módulos integrados del sistema MLBT, incluyendo código fuente versionado, URLs públicas de ejecución, documentación de entradas y salidas, pruebas realizadas y resultados obtenidos.

## Repositorio

| Elemento | Valor |
|---|---|
| Repositorio GitHub | https://github.com/borikano/MLBT_Proyecto |
| Rama estable | Arawkano |
| Control de versiones | Git y GitHub |

## URLs públicas de entrega

| Servicio | URL | Estado |
|---|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app | Publicado en Vercel. |
| Login React | https://mlbt-proyecto.vercel.app/login | Validado con autenticación real. |
| Dashboard React | https://mlbt-proyecto.vercel.app/dashboard | Accesible después del login. |
| API Node | https://mlbt-proyecto.onrender.com | Publicada en Render. |
| Health API | https://mlbt-proyecto.onrender.com/api/health | Validado en producción. |

## Base de datos pública

| Elemento | Valor |
|---|---|
| Proveedor | Aiven |
| Motor | MySQL 8.4 |
| Host | mlbt-mlbt-mysql.e.aivencloud.com |
| Puerto | 24063 |
| Base de datos | defaultdb |
| Usuario | avnadmin |
| SSL | REQUIRED |
| Uso | Base de datos pública conectada a la API Node mediante variable DATABASE_URL en Render. |

No se publica la contraseña, la cadena completa de conexión ni variables de entorno sensibles por seguridad.

## Documentos de entrega

| Documento | Descripción |
|---|---|
| [Módulos integrados](GA8_220501096_AA1_EV02_modulos_integrados.md) | Relación de módulos, tecnologías, ejecución y estado de integración. |
| [Entradas y salidas](GA8_220501096_AA1_EV02_entradas_salidas.md) | Datos de entrada y salida por módulo y componente. |
| [Reporte de pruebas](pruebas/GA8_220501096_AA1_EV02_reporte_pruebas_modulos_integrados.md) | Pruebas realizadas sobre API, frontend e integración pública. |

## Módulos principales

| Módulo | Ruta | Estado |
|---|---|---|
| Frontend React | ../../../01_FRONT_END/01_REACT_AP07 | Publicado en Vercel e integrado con API pública. |
| API Node | ../../../02_BACK_END/01_API_NODE | Publicada en Render con JWT, Prisma y MySQL. |
| Base de datos | Aiven MySQL 8.4 | Publicada y conectada mediante Render. |
| Spring Web | ../../../02_BACK_END/02_SPRING_WEB | Módulo complementario disponible en repositorio. |
| Java Web | ../../../02_BACK_END/03_JAVA_WEB | Módulo complementario disponible en repositorio. |

## Flujo público validado

1. El usuario ingresa a https://mlbt-proyecto.vercel.app/login.
2. React envía las credenciales a https://mlbt-proyecto.onrender.com/api/auth/login.
3. La API Node valida credenciales contra Aiven MySQL mediante Prisma y bcrypt.
4. La API devuelve token JWT y datos del usuario.
5. React guarda la sesión y permite el acceso al dashboard.
6. El usuario puede navegar por dashboard, usuarios, inventario y ventas.
7. El cierre de sesión limpia la sesión y retorna al login.

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | [REDACTED - TEST DATA] |
| Rol | ADMIN_APP |

## Resultado

La evidencia GA8-220501096-AA1-EV02 queda soportada con módulos integrados, URLs públicas, base de datos pública, API pública, frontend público y pruebas funcionales del flujo de autenticación.
