# Estandares del proyecto MLBT

Este documento complementa el `README.md` y debe mantenerse actualizado cada vez que cambien reglas de negocio, arquitectura, flujos, permisos o decisiones tecnicas del proyecto.

## Regla de mantenimiento

Cuando se haga un cambio relevante en el proyecto, se deben revisar dos archivos:

1. `README.md`
2. `docs/estandares-proyecto-mlbt.md`

Objetivo:

- `README.md`: vision general del sistema, arquitectura, modulos y guia de continuidad.
- `docs/estandares-proyecto-mlbt.md`: reglas operativas, estandares tecnicos, criterios de UI y decisiones de negocio que deben respetarse.

## Estandares generales

- El proyecto debe seguir siendo HTML, CSS y JavaScript Vanilla mientras no se defina otra arquitectura.
- No usar CDNs, librerias remotas ni imagenes externas.
- Mantener separacion estricta de responsabilidades:
  - HTML para estructura
  - CSS para presentacion
  - JavaScript para comportamiento
- No usar `innerHTML` para renderizar datos dinamicos del sistema.
- No usar eventos inline en HTML.
- Usar `addEventListener` para comportamiento interactivo.
- Mantener cambios pequenos, verificables y enfocados.
- Si una estructura privada se repite en varias vistas, debe extraerse a un helper o renderer comun antes de seguir duplicandola.
- Las reglas de permisos compartidas deben vivir en una unica utilidad reutilizable.
- En entorno offline, no depender de `fetch` para ensamblar componentes locales criticos.
- Navbar, sidebar y footer privados deben renderizarse desde `js/components.js`.
- Las vistas publicas repetibles como login y registro deben reutilizar navbar y footer desde `js/components.js`.
- Los bloques introductorios compartidos de login y registro deben construirse desde helpers reutilizables en `js/components.js`.
- Cada pagina debe preferir un unico script modulo principal que importe sus dependencias, evitando cargas redundantes del mismo modulo.

## Practicas recomendadas de continuidad

- Usar una sola fuente de verdad por componente compartido.
- Evitar copiar y pegar navegacion, validaciones o permisos entre paginas.
- Si un ajuste aparece por tercera vez, convertirlo en componente, helper o configuracion.
- Documentar toda regla transversal junto con su ubicacion tecnica principal.
- Validar inmediatamente despues de tocar autenticacion, navegacion o permisos.
- Eliminar fragmentos legacy cuando dejen de ser la fuente de verdad para evitar divergencias.
- No conservar carpetas vacias ni archivos placeholder sin uso real documentado.
- Mantener el `index.html` como landing especial solo cuando su composicion realmente difiera del resto de vistas publicas.
- Si un modulo ya se importa desde el script principal de la pagina, no volver a cargarlo con otra etiqueta `script type="module" src="..."`.

## Estandares de ramas, versionado y respaldo

### Modelo de ramas

- `Arawkano` debe representar la version estable y aprobada del proyecto.
- `principal` debe representar la version de trabajo e integracion.
- Las ramas `feature/*`, `fix/*` y `hotfix/*` deben usarse para cambios puntuales y de corta vida.
- No desarrollar directamente sobre `Arawkano`.
- No duplicar ramas base con el mismo rol operativo.
- Las ramas base activas del repositorio deben mantenerse reducidas a `Arawkano` y `principal`, salvo que aparezca una necesidad tecnica justificada.

### Flujo minimo obligatorio

- Todo cambio nuevo debe pasar primero por `principal`.
- Antes de promover a `Arawkano`, el cambio debe estar probado, documentado y respaldado.
- La promocion de `principal` a `Arawkano` debe preferir Pull Request o una fusion controlada.
- Si una version no esta aprobada, no debe llegar a `Arawkano`.

### Versionado

- Los hitos aprobados deben etiquetarse con tags versionados.
- El proyecto debe usar una secuencia coherente, por ejemplo `v0.1.0`, `v0.2.0`, `v0.2.1`, `v1.0.0`.
- Los tags deben crearse sobre versiones ya validadas en la rama estable.

### Respaldo y recuperacion

- GitHub debe funcionar como respaldo principal del historial del codigo.
- Debe hacerse `push` frecuente a la rama de trabajo para no acumular cambios sin respaldo remoto.
- Para hitos importantes, debe existir copia adicional en nube o medio externo.
- No usar `push --force` sobre ramas estables.
- No aplicar comandos destructivos sin revisar antes el estado del repositorio.

### Regla critica de continuidad

- Nada debe llegar a `Arawkano` si antes no paso por `principal`, fue probado, documentado y respaldado.

## Estandares visuales

- Respetar la identidad institucional calida del proyecto.
- La landing publica debe comunicar bienvenida, operacion basica del restaurante y accesos principales.
- La landing debe evitar redundancias visuales; si el acceso principal ya esta en la cabecera, no debe repetirse innecesariamente en el hero.
- Mantener consistencia entre dashboard, usuarios, inventario y ventas.
- Los estilos compartidos deben separarse cuando el patron sea reutilizable.
- `css/forms.css` debe concentrar inputs, selects, botones y estados interactivos comunes.
- `css/tables.css` debe concentrar tablas administrativas, contraste, zebra striping y acciones.
- `css/components.css` debe concentrar navbar, sidebar, footer, tarjetas y otros componentes visuales reutilizables.
- `css/main.css` debe reservarse para layout, secciones de pagina y overrides puntuales que no pertenezcan a `forms.css`, `tables.css` o `components.css`.
- La tipografia del hero publico debe priorizar lectura limpia en escritorio, sin cortes agresivos ni bloques sobredimensionados.
- No romper formularios por anchos minimos excesivos.
- En escritorio, los formularios administrativos deben priorizar dos columnas limpias.
- En pantallas reducidas, los formularios deben pasar a una sola columna.
- Las tablas administrativas deben preservar contexto visual:
  - evitar partir palabras por letras
  - usar scroll horizontal limpio cuando haya muchas columnas
  - colocar columnas operativas criticas al inicio cuando sea necesario
- Los mensajes de sesion visibles en vistas privadas deben mostrar nombre o rol visible, nunca el correo como dato principal.

## Estandares de experiencia publica

- `index.html` es la landing publica oficial del proyecto.
- Debe ofrecer acceso a `pages/login.html` y `pages/register.html`.
- `pages/register.html` es una vista informativa del flujo controlado y no debe dar de alta usuarios directamente.
- Las altas nuevas deben registrarse desde el modulo interno de usuarios bajo control administrativo.
- `pages/login.html` debe mantener una sola accion principal de acceso y un regreso claro al inicio sin duplicaciones innecesarias en el formulario.
- `js/app.js` debe ejecutar inicializacion en `DOMContentLoaded`.
- Si existe sesion activa, la landing puede reemplazar acciones publicas por acceso directo al dashboard.
- `pages/dashboard.html` debe mostrar resumen de sesion por nombre y rol visible, nunca por correo.

## Estandares de autenticacion y sesion

- Solo los usuarios con estado `Activo` pueden iniciar sesion.
- Usuarios en `Pendiente de baja` no deben acceder al sistema.
- Usuarios en `Retirado` no deben acceder al sistema.
- Si el estado cambia mientras hay una sesion activa, el sistema debe invalidarla.
- La vista privada no debe exponer el correo del usuario como identificador principal de sesion.

## Estandares de usuarios

### Roles vigentes

- `Administrador del sistema`
- `Administrador de tienda`
- `Mesero`
- `Cocinero`

### Prefijos de registro

- `ADM`
- `ADT`
- `MES`
- `COC`

### Reglas de permisos

- Nadie puede gestionarse a si mismo.
- El usuario raiz `ADM-0001` esta protegido.
- `pages/users.html` y `pages/users-list.html` deben bloquear acceso a usuarios operativos y redirigirlos a `pages/dashboard.html`.
- El `Administrador del sistema` puede ver todos los usuarios del sistema.
- El `Administrador de tienda` solo puede verse a si mismo y a los usuarios operativos.
- Los usuarios `Mesero` y `Cocinero` solo pueden verse a si mismos.
- Los usuarios operativos no deben ver acciones visuales para registrar o solicitar nuevos usuarios.
- Los usuarios operativos no deben ver enlaces al modulo de usuarios en el dashboard ni en la navegacion privada lateral.
- La navegacion privada reutilizable debe construirse desde `js/components.js` y respetar la misma regla de ocultamiento para perfiles operativos.
- Las nuevas altas solicitadas por `Administrador de tienda` deben quedar en `Pendiente de aprobación`.
- Solo el `Administrador del sistema` puede aprobar un alta pendiente o registrar un usuario de forma directa.
- El `Administrador del sistema` puede crear `Administrador de tienda`, `Mesero` y `Cocinero`.
- El `Administrador de tienda` solo puede crear `Mesero` y `Cocinero`.
- El `Administrador de tienda` no retira directamente: solo solicita bajas para usuarios operativos.
- El `Administrador del sistema` aprueba bajas y puede reactivar usuarios retirados.

### Estados de usuario

- `Activo`
- `Pendiente de aprobación`
- `Pendiente de baja`
- `Retirado`

### Regla critica

Las bajas son logicas. No se elimina el registro del usuario del almacenamiento operativo.

## Estandares de inventario

- El numero de registro del item se genera automaticamente.
- El numero de registro no se muestra en el formulario de creacion.
- El numero de registro si se muestra en el listado.
- La columna `Alerta` debe permanecer visible y prioritaria en el listado cuando aplique.
- Los movimientos permitidos son:
  - `entrada`
  - `salida`
  - `ajuste`

## Estandares de ventas

- Las ventas deben consumir inventario real.
- El pedido debe validarse antes de confirmar.
- El historial debe conservar usuario, fecha, detalle y total.

## Estandares de datos y arquitectura

- La logica debe estar modularizada por dominio.
- La persistencia no debe dispersarse por todo el proyecto.
- Cualquier acceso a datos nuevo debe preferir la capa `js/services/`.
- Si se agrega backend, primero debe integrarse por la capa de servicios y no desde las paginas HTML directamente.

## Capa de servicios actual

Archivos base:

- `js/services/service-config.js`
- `js/services/user-data-service.js`
- `js/services/local/user-data-service.local.js`
- `js/services/remote/user-data-service.remote.js`

Regla:

- Todo cambio que prepare backend debe pasar por esta capa.

## Estandares de documentacion

Cada vez que cambie alguno de estos puntos, se debe actualizar:

1. `README.md`
2. `docs/estandares-proyecto-mlbt.md`

Minimo se debe documentar cuando cambie:

- una regla de acceso
- una regla de negocio
- un flujo de usuarios
- una estructura de almacenamiento
- una decision de UI que afecte varios modulos
- una preparacion para backend

## Pendientes que deben seguir el mismo criterio

- Vista de auditoria de usuarios.
- Badges visuales para estados y alertas.
- Migracion de inventario y ventas a la capa de servicios.
- Implementacion del proveedor remoto real.
## Separación por tipo de código y responsabilidad

El proyecto debe mantener separación estricta por tipo de archivo, tecnología y responsabilidad.

Reglas:

- HTML y JSP deben usarse para estructura y vistas.
- CSS debe concentrar únicamente estilos y presentación.
- JavaScript debe concentrar comportamiento frontend, eventos y consumo de servicios.
- Java debe concentrar controladores, modelos, servicios y lógica de servidor cuando exista módulo backend o Java Web.
- La documentación técnica debe permanecer en `docs/`.
- No se deben mezclar marcos de trabajo ni responsabilidades en un mismo archivo.
- Los archivos `index.html` o `index.jsp` deben funcionar como punto de entrada o navegación inicial, no como ubicación de lógica importante o sensible.
- Las reglas críticas deben centralizarse en módulos, servicios o controladores según la tecnología usada.

