# GA8-220501096-AA1-EV02 - Entradas y salidas por módulo

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Registrar los datos de entrada y salida de los módulos integrados del sistema MLBT.

## Frontend React

| Componente | Entrada | Salida | Observación |
|---|---|---|---|
| Login | usuario, clave | Sesión autenticada o mensaje de error | Consume POST /api/auth/login. |
| ProtectedRoute | Sesión guardada | Permite acceso o redirige a /login | Valida sesión en frontend. |
| Logout | Clic en Cerrar sesión | Limpia sesión y retorna a /login | Validado visualmente. |
| Dashboard | Sesión autenticada | Panel administrativo | Acceso protegido. |
| Usuarios | Datos locales de apoyo | Tabla y formulario de usuarios | Módulo visual disponible. |
| Inventario | Datos locales de apoyo | Inventario y movimientos | Módulo visual disponible. |
| Ventas | Datos locales de apoyo | Registro y análisis de ventas | Módulo visual disponible. |

## API Node

| Endpoint | Método | Entrada | Salida | Estado validado |
|---|---|---|---|---|
| / | GET | Sin entrada | Información general de API | 200 OK |
| /api/health | GET | Sin entrada | Estado running del servicio | 200 OK |
| /api/auth/login | POST | username, password | token JWT, usuario autenticado | 200 OK |
| /api/auth/profile | GET | Authorization Bearer Token | Perfil autenticado | 200 OK |
| /api/users | GET | Authorization Bearer Token | Lista de usuarios | 200 OK |
| /api/inventory | GET | Authorization Bearer Token | Lista de inventario | 200 OK |
| /api/sales | GET | Authorization Bearer Token | Lista de ventas | 200 OK |
| /api/auth/login | POST | Credenciales incorrectas | Error de autenticación | 401 esperado |
| /api/auth/profile | GET | Sin token | Error de autorización | 401 esperado |

## Base de datos

| Modelo | Entrada | Salida | Uso |
|---|---|---|---|
| Usuario | username, passwordHash, rol, estado | Usuarios autenticables | Login, perfil y usuarios. |
| ProductoInventario | nombre, descripción, stock, unidad, estado | Inventario disponible | Consulta de inventario. |
| Venta | producto, cantidad, total, usuario | Historial de ventas | Consulta de ventas. |

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | AdminApp123* |
| Resultado esperado | Acceso al dashboard y token JWT |

## Resultado

Las entradas y salidas principales quedan documentadas para los módulos integrados del proyecto MLBT.
