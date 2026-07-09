# GA8-220501096-AA1-EV02 - Módulos integrados

## Proyecto

MLBT - María La Bonita Taquería.

## Propósito

Documentar los módulos integrados del sistema y su relación técnica dentro del proyecto.

## Repositorio de control de versiones

| Elemento | Valor |
|---|---|
| Repositorio | MLBT_Proyecto |
| Rama de trabajo | feature/GA8_220501096_AA1_EV01_EV02_INTEGRACION_DESPLIEGUE |
| Rama estable base | Arawkano |
| Control de versiones | Git y GitHub |

## Módulos integrados

| Módulo | Tecnología | Ruta | Descripción |
|---|---|---|---|
| Frontend React | React, Vite, Tailwind CSS, shadcn/ui | 01_FRONT_END/01_REACT_AP07 | Interfaz administrativa del sistema. |
| API Node | Node.js, Express, Prisma, JWT, bcrypt, Zod | 02_BACK_END/01_API_NODE | Servicios REST, autenticación y acceso a datos. |
| Base de datos | MySQL/MariaDB | XAMPP local | Persistencia usada por Prisma. |
| Spring Web | Java, Spring Boot, Thymeleaf | 02_BACK_END/02_SPRING_WEB | Módulo complementario del proyecto. |
| Java Web | JSP, Servlets, Maven | 02_BACK_END/03_JAVA_WEB | Módulo complementario de evidencia Java Web. |

## Integración validada

El flujo principal integrado corresponde al inicio de sesión real desde React hacia la API Node.

| Paso | Descripción |
|---|---|
| 1 | El usuario ingresa credenciales en React. |
| 2 | React envía POST /api/auth/login a la API Node. |
| 3 | La API valida credenciales con Prisma y bcrypt. |
| 4 | La API devuelve token JWT y datos del usuario. |
| 5 | React guarda la sesión en sessionStorage. |
| 6 | ProtectedRoute permite el acceso al dashboard. |
| 7 | El botón Cerrar sesión limpia la sesión y retorna al login. |

## Comandos de ejecución local

### Base de datos

Iniciar MySQL desde XAMPP en el puerto 3306.

### API Node

`powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\01_API_NODE"
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm seed
pnpm dev
`",
  ",

`powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
pnpm install
pnpm dev
`",
  ",

La integración está validada localmente. Para la entrega con URLs públicas se debe realizar despliegue posterior de base de datos, backend y frontend.
