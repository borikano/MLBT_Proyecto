# GA7_220501096_AA3_EV01 - Hoja de ruta evolutiva del proyecto MLBT

## Proposito

Registrar de forma ordenada los componentes tecnicos y funcionales que seran abordados en una fase posterior del proyecto MLBT, sin afectar el cierre funcional de la evidencia actual.

## Estado actual de la evidencia

El modulo Spring Web actual entrega:

- Dashboard funcional.
- CRUD de usuarios.
- CRUD de inventario.
- CRUD de ventas.
- Persistencia en MySQL/MariaDB.
- Integracion visual con identidad MLBT.
- Documentacion tecnica de soporte.
- Ejecucion local mediante Maven Wrapper.
- Navegacion funcional entre modulos principales.

## Alcance cerrado para esta entrega

Para la evidencia GA7_220501096_AA3_EV01 se entrega una base funcional web con Spring Boot, enfocada en demostrar codificacion de modulos, persistencia, vistas web y operaciones principales sobre datos.

El alcance actual no incluye todavia seguridad avanzada, roles completos, KDS, reportes, auditoria extendida ni modulos especializados del restaurante.

## Linea evolutiva posterior

La documentacion general del proyecto MLBT define una arquitectura funcional mas amplia, con modulos especializados por operacion del restaurante. Para las siguientes fases se proyecta ampliar el sistema en los siguientes frentes:

| Frente | Descripcion |
|---|---|
| Autenticacion | Login real, cierre de sesion y control de sesion. |
| Roles y permisos | Control de acceso por perfil operativo. |
| Auditoria | Registro de acciones importantes: creacion, edicion, eliminacion y cambios de estado. |
| KDS / Cocina | Vista de cocina para recepcion, priorizacion y cambio de estado de pedidos. |
| Inventario avanzado | Stock minimo, movimientos, alertas y reposicion. |
| Reportes | Indicadores de ventas, tiempos de preparacion y operacion. |
| Catalogo / Menu | Productos, categorias, recetas y modificadores. |
| Mesas y cuentas | Gestion de salon, mesas, cuentas y asignaciones. |
| Incidencias | Anulaciones, devoluciones y trazabilidad de eventos. |
| Seguridad avanzada | RBAC, proteccion de formularios, endurecimiento y control de intentos. |
| Accesibilidad | Mejora de contraste, foco visible, navegacion por teclado y experiencia responsive. |

## Roles proyectados

| Rol | Uso proyectado |
|---|---|
| Administrador de APP | Administracion general del sistema. |
| Administrador de Tienda | Operacion administrativa del punto de venta. |
| Mesero | Registro de pedidos y atencion en salon. |
| Cocina / KDS | Gestion de pedidos en preparacion. |
| Bodega | Gestion de inventario, stock y reposicion. |
| Cajero | Ventas, cuentas y cierres. |
| Lectura | Consulta y revision autorizada. |

## Priorizacion posterior recomendada

La siguiente fase debe priorizar:

1. Seguridad y autenticacion.
2. Roles y permisos.
3. Usuarios y auditoria.
4. Inventario avanzado.
5. Ventas y pedidos.
6. Cocina/KDS.
7. Reportes.
8. Mejoras de accesibilidad y compatibilidad.

## Criterio tecnico

La evolucion debe realizarse sobre el modulo Spring Web actual, sin regresar al enfoque offline ni reconstruir desde cero.

La base actual debe conservarse y fortalecerse mediante:

- Spring Security.
- Controladores protegidos.
- Servicios con reglas de negocio.
- Persistencia JPA.
- Templates Thymeleaf por rol.
- Validaciones de formularios.
- Auditoria de acciones.
- Documentacion tecnica por fase.

## Cierre

Esta hoja de ruta separa claramente el alcance funcional entregado en la evidencia actual de la evolucion natural del sistema MLBT, manteniendo trazabilidad tecnica y orden para futuras mejoras.
