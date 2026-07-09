# GA8-220501096-AA1-EV02 - Módulos integrados

## Proyecto

MLBT - María La Bonita Taquería.

## Propósito

Documentar los módulos integrados del sistema y su relación técnica dentro del proyecto.

## Repositorio de control de versiones

| Elemento | Valor |
|---|---|
| Repositorio | https://github.com/borikano/MLBT_Proyecto |
| Rama estable | Arawkano |
| Control de versiones | Git y GitHub |

## Módulos integrados

| Módulo | Tecnología | Ruta / Servicio | Estado |
|---|---|---|---|
| Frontend React | React, Vite, Tailwind CSS, shadcn/ui | https://mlbt-proyecto.vercel.app | Publicado en Vercel. |
| API Node | Node.js, Express, Prisma, JWT, bcrypt, Zod | https://mlbt-proyecto.onrender.com | Publicado en Render. |
| Base de datos | Aiven MySQL 8.4 | Aiven Cloud | Publicada y conectada con API mediante DATABASE_URL. |
| Spring Web | Java, Spring Boot, Thymeleaf | 02_BACK_END/02_SPRING_WEB | Módulo complementario disponible. |
| Java Web | JSP, Servlets, Maven | 02_BACK_END/03_JAVA_WEB | Módulo complementario disponible. |

## URLs públicas

| Servicio | URL |
|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app |
| Login | https://mlbt-proyecto.vercel.app/login |
| Dashboard | https://mlbt-proyecto.vercel.app/dashboard |
| API Node | https://mlbt-proyecto.onrender.com |
| Health API | https://mlbt-proyecto.onrender.com/api/health |

## Integración validada

| Paso | Descripción |
|---|---|
| 1 | El usuario ingresa credenciales en React publicado en Vercel. |
| 2 | React envía POST /api/auth/login a la API Node publicada en Render. |
| 3 | La API valida credenciales contra Aiven MySQL con Prisma y bcrypt. |
| 4 | La API devuelve token JWT y datos del usuario. |
| 5 | React guarda la sesión en sessionStorage. |
| 6 | ProtectedRoute permite el acceso al dashboard. |
| 7 | El botón Cerrar sesión limpia la sesión y retorna al login. |

## Seguridad

La contraseña de la base de datos, el Service URI completo y la variable DATABASE_URL no se documentan en el repositorio. Estos valores se administran como variables de entorno en Render.

## Resultado

Los módulos principales del proyecto MLBT quedan integrados y publicados con URLs públicas funcionales para la evidencia GA8-220501096-AA1-EV02.
