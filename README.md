# MLBT Project

Sistema administrativo frontend para Maria La Bonita Taqueria.

El proyecto esta construido con HTML, CSS y JavaScript Vanilla, con funcionamiento local y sin dependencias externas. Actualmente opera en modo offline usando almacenamiento local del navegador, pero ya incluye una capa inicial de servicios para facilitar una migracion futura a backend.

## Documentacion Base

Este repositorio debe mantener dos fuentes de documentacion visibles y sincronizadas:

- `README.md`
- `docs/estandares-proyecto-mlbt.md`

Uso recomendado:

- `README.md`: panorama general del sistema, modulos, arquitectura y continuidad.
- `docs/estandares-proyecto-mlbt.md`: reglas tecnicas, operativas y criterios que deben respetarse en futuras modificaciones.

Si cambia una regla de negocio, un flujo, un permiso, una decision visual compartida o la preparacion para backend, deben actualizarse ambos documentos.

## Estado Actual

- Frontend 100% offline.
- Landing publica con acceso a login y registro de personal.
- Registro publico controlado para personal operativo.
- Landing y login ajustados para reducir redundancias visuales y mejorar legibilidad tipografica.
- Navegacion privada para dashboard, usuarios, inventario y ventas.
- Autenticacion local con sesion protegida.
- Gestion de usuarios con roles, estados, bajas logicas y reactivacion.
- Inventario con registro de items, movimientos y alertas por stock.
- Ventas con armado de pedido, confirmacion y descuento de inventario.
- Capa inicial de servicios para migracion futura a backend.
- Estilos separados para formularios y tablas reutilizables.

## Estructura

```text
assets/       Recursos locales como logo e imagenes
css/          Variables, estilos de componentes, formularios, tablas y layout
js/           Logica por dominio, componentes renderizados y servicios
pages/        Pantallas publicas y privadas del sistema
index.html    Landing publica principal
```

## Modulos Principales

### Experiencia publica

- Archivos principales: `index.html`, `pages/login.html`, `pages/register.html`, `js/app.js`
- `index.html` funciona como landing publica de Maria La Bonita Taqueria.
- La landing prioriza acceso administrativo, resumen operativo y una composicion compacta sin CTAs repetidos.
- `js/app.js` inicializa la aplicacion al cargar el DOM.
- Si hay una sesion activa, la landing oculta acciones publicas y muestra acceso directo al dashboard.
- `pages/register.html` informa el flujo de alta controlada y ya no registra usuarios directamente.
- El alta de nuevos usuarios debe gestionarse desde administracion, nunca desde un formulario publico directo.
- `pages/login.html` incluye retorno al inicio desde la cabecera y mantiene el formulario como accion principal unica.
- `pages/dashboard.html` resume la sesion por nombre y rol visible, sin exponer el correo autenticado.

### Autenticacion

- Archivo principal: `js/auth.js`
- Controla login, logout y proteccion de rutas privadas.
- Solo pueden ingresar usuarios con estado `Activo`.
- Si un usuario cambia a `Pendiente de baja` o `Retirado`, pierde acceso al sistema.
- En vistas privadas, la sesion visible debe mostrarse por nombre del usuario y no por correo.

Credenciales raiz actuales:

- Email: `admin@mlbt.com`
- Password: `admin123`
- Rol: `Administrador del sistema`
- Registro: `ADM-0001`

### Usuarios

- Archivos principales: `js/users.js`, `pages/users.html`, `pages/users-list.html`
- Roles soportados:
  - `Administrador del sistema`
  - `Administrador de tienda`
  - `Mesero`
  - `Cocinero`
- Prefijos de registro:
  - `ADM`
  - `ADT`
  - `MES`
  - `COC`

Estados de usuario:

- `Activo`: puede iniciar sesion.
- `Pendiente de aprobación`: no puede iniciar sesion hasta ser aprobado por un `Administrador del sistema`.
- `Pendiente de baja`: no puede iniciar sesion; queda pendiente de aprobacion.
- `Retirado`: no puede iniciar sesion; el registro se conserva.

Reglas de negocio vigentes:

- Nadie puede gestionarse a si mismo.
- El usuario raiz `ADM-0001` esta protegido.
- `pages/users.html` y `pages/users-list.html` solo admiten acceso de `Administrador del sistema` y `Administrador de tienda`.
- Si un `Mesero` o `Cocinero` intenta entrar a las vistas de usuarios, debe ser redirigido a `pages/dashboard.html`.
- El `Administrador del sistema` puede ver todos los usuarios del sistema.
- El `Administrador de tienda` solo puede verse a si mismo y a los usuarios operativos (`Mesero` y `Cocinero`).
- Los usuarios `Mesero` y `Cocinero` solo pueden verse a si mismos.
- Los usuarios operativos no deben ver acciones de gestion de altas dentro del modulo de usuarios.
- Los usuarios operativos no deben ver accesos al modulo de usuarios en el dashboard ni en la navegacion privada lateral.
- El `Administrador de tienda` solo puede generar solicitudes de alta para usuarios operativos.
- El `Administrador del sistema` aprueba solicitudes de alta o puede registrar directamente un usuario desde el modulo interno.
- El `Administrador del sistema` puede crear `Administrador de tienda`, `Mesero` y `Cocinero`.
- El `Administrador de tienda` solo puede crear `Mesero` y `Cocinero`.
- El `Administrador de tienda` no retira directamente: genera solicitud de baja para usuarios operativos.
- El `Administrador del sistema` puede aprobar bajas y reactivar usuarios retirados.
- Las bajas son logicas: no se elimina el registro del repositorio local.

Bitacora local:

- Clave de almacenamiento: `mlbt_user_audit_log`
- Registra creacion, solicitud de alta, aprobacion de alta, solicitud de baja, retiro y reactivacion.

### Inventario

- Archivos principales: `js/inventory.js`, `pages/inventory.html`
- El numero de registro del item se genera automaticamente con prefijo `PRD`.
- El registro no se muestra en el formulario; solo en el listado.
- La tabla muestra `Alerta` al inicio para visibilidad operativa.
- Se soportan movimientos de `entrada`, `salida` y `ajuste`.

### Ventas

- Archivos principales: `js/sales.js`, `pages/sales.html`
- Permite agregar productos al pedido, confirmar venta y registrar historial.
- La venta descuenta stock desde inventario.

## Capa de Servicios

Para facilitar la futura conexion con backend, el proyecto ya no depende completamente de `localStorage` desde todos los modulos.

Archivos clave:

- `js/services/service-config.js`
- `js/services/user-data-service.js`
- `js/services/local/user-data-service.local.js`
- `js/services/remote/user-data-service.remote.js`

Hoy el proveedor activo es:

- `local`

Objetivo de esta capa:

- Mantener la UI estable.
- Encapsular el acceso a datos.
- Permitir cambiar de almacenamiento local a API remota con menor impacto.

## Buenas Practicas Del Repositorio

- Mantener el proyecto offline por defecto mientras no exista backend real.
- No usar CDNs, imagenes remotas ni dependencias externas innecesarias.
- Mantener separacion estricta:
  - HTML: estructura
  - CSS: presentacion
  - JavaScript: comportamiento
- Organizar la logica por dominio.
- No usar `innerHTML` para datos dinamicos.
- No usar eventos inline en HTML.
- Usar `addEventListener`.
- Mantener la identidad visual institucional calida ya definida.
- Reutilizar `css/forms.css` para campos y botones compartidos.
- Evitar redefinir en `css/main.css` componentes ya centralizados en `css/forms.css` o `css/components.css`.
- Reutilizar `css/tables.css` para tablas administrativas compartidas.
- Reutilizar `css/components.css` para navbar, sidebar, footer y tarjetas compartidas.
- Centralizar estructuras privadas repetidas en renderizadores o utilidades compartidas antes de duplicar HTML entre paginas.
- Centralizar reglas de permisos en `js/auth.js` y reutilizar helpers desde las vistas, en lugar de reescribir condicionales por pagina.
- Si un cambio debe repetirse en mas de dos archivos, primero evaluar extraer componente, helper o configuracion comun.
- Preferir construccion de DOM con JavaScript para componentes offline reutilizables antes que depender de `fetch` sobre fragmentos HTML locales.
- La estructura privada base debe componerse desde `js/components.js`: navbar, sidebar y footer.
- Login y registro publico deben reutilizar navbar y footer desde `js/components.js`; el `index.html` puede conservar una composicion especial de landing.
- Los bloques introductorios repetidos de login y registro deben renderizarse desde helpers publicos compartidos en `js/components.js`.
- Preferir cambios pequenos y controlados sobre refactors grandes sin validacion.
- Cuando una regla sea de negocio, documentarla primero y luego implementarla.

## Flujo de ramas y continuidad

Modelo vigente recomendado:

- `Arawkano`: rama estable, aprobada y de referencia. No debe usarse para desarrollo diario.
- `principal`: rama de integracion y desarrollo vigente. Todo cambio nuevo debe llegar primero aqui.
- `feature/*`, `fix/*`, `hotfix/*`: ramas cortas de trabajo para cambios puntuales.

Estado actual del repositorio:

- Las ramas base vigentes son `Arawkano` y `principal`.
- La rama `main` fue retirada para evitar duplicar el rol de rama de trabajo.

Reglas operativas:

- Ningun cambio nuevo debe desarrollarse directamente en `Arawkano`.
- Todo cambio debe nacer desde `principal` o desde una rama corta creada a partir de `principal`.
- Antes de promover codigo a `Arawkano`, el cambio debe estar probado, documentado y aprobado en `principal`.
- Si `Arawkano` representa la version estable, `principal` representa la version en evolucion.
- No mantener varias ramas base con el mismo rol funcional.

Flujo recomendado:

1. Actualizar `principal`.
2. Crear una rama `feature/*` o `fix/*`.
3. Desarrollar y hacer commits pequenos.
4. Integrar primero a `principal`.
5. Validar compatibilidad, permisos, navegacion y modulos criticos.
6. Promover desde `principal` hacia `Arawkano` solo cuando el cambio quede aprobado.

Promocion a estable:

- Preferir Pull Request de `principal` hacia `Arawkano`.
- Si se fusiona por terminal, hacerlo solo cuando `Arawkano` deba recibir una version ya validada.

## Versionado y respaldos

Versionado recomendado:

- Usar tags para hitos aprobados, por ejemplo `v0.1.0`, `v0.2.0`, `v0.2.1`, `v1.0.0`.
- Crear un tag cada vez que `Arawkano` reciba una version estable importante.

Respaldo recomendado:

- GitHub funciona como respaldo principal del historial del codigo.
- Se debe hacer `push` frecuente a `principal` para no acumular trabajo sin respaldo remoto.
- Ademas del repositorio remoto, conservar una copia externa en nube o disco externo para hitos importantes.
- No usar `push --force` sobre ramas estables.
- No usar comandos destructivos sin necesidad y sin validar el estado del repositorio.

Regla de seguridad operativa:

- Nada debe llegar a `Arawkano` si antes no paso por `principal`, fue probado, documentado y respaldado.

## Practicas Recomendadas Para No Repetir Instrucciones

- Definir una sola fuente de verdad para navegacion privada, permisos y reglas transversales.
- Convertir patrones repetidos en funciones reutilizables antes de seguir agregando paginas nuevas.
- Mantener una convencion simple: reglas de acceso en `js/auth.js`, UI compartida en `js/components.js`, estilos compartidos en CSS dedicado.
- No conservar fragmentos HTML legacy de componentes si ya existe un renderer activo equivalente.
- Tratar las vistas publicas especiales como excepciones explicitas, no como motivo para volver a duplicar estructuras comunes.
- Evitar etiquetas `script type="module" src="..."` redundantes cuando la pagina ya importa esos modulos desde un unico script principal.
- Actualizar `README.md` y `docs/estandares-proyecto-mlbt.md` cada vez que cambie una regla transversal o una convencion de desarrollo.
- Validar archivos tocados inmediatamente despues de cada cambio para detectar roturas temprano.
- Evitar introducir una segunda fuente de verdad para el mismo componente o flujo.
- Mantener documentado el flujo de ramas, versionado y respaldo como parte de la arquitectura del proyecto, no como nota temporal.

## Reglas UI Actuales

- La landing publica debe mantener acceso claro a login y registro de personal.
- El acceso publico de registro debe ser solo informativo cuando el alta este controlada por administracion.
- La landing no debe duplicar botones de acceso dentro del hero si ya existen en la cabecera.
- La tipografia del hero publico debe mantenerse compacta, legible y sin desbordes en escritorio.
- El login debe conservar una accion principal unica y una salida secundaria no redundante.
- Las tablas administrativas deben conservar contexto y evitar romper palabras innecesariamente.
- Si una tabla necesita muchas columnas, debe usar scroll horizontal limpio dentro del modulo.
- Los formularios de usuarios, inventario y ventas deben mantener dos columnas en escritorio y una sola en pantallas pequenas.
- Los mensajes de estado deben ser claros y visibles para el usuario final.
- La sesion visible en modulos privados debe identificar al usuario por nombre visible, no por correo.
- Las altas nuevas creadas por `ADT` deben quedar en `Pendiente de aprobación` hasta validacion de `ADM`.
- Los usuarios operativos no deben ver botones de alta o solicitud de nuevos usuarios.

## Preparacion Para Backend

Cuando se conecte backend, el orden recomendado es:

1. Autenticacion y sesiones.
2. Usuarios y auditoria.
3. Inventario.
4. Ventas.

En esa migracion se debe mover al servidor:

- Hash de contrasenas.
- Validacion de roles y permisos.
- Control de sesiones o tokens.
- Auditoria persistente.
- Recuperacion de contrasena real.

## Pendientes Recomendados

- Crear vista visual de auditoria de usuarios.
- Agregar badges visuales para `Estado` y `Alerta`.
- Migrar inventario y ventas a la misma capa de servicios usada por usuarios.
- Implementar proveedor remoto real en `js/services/remote/`.

## Nota De Desarrollo

Este proyecto ya tiene reglas de negocio importantes implementadas. Antes de tocar autenticacion, usuarios o permisos, revisar primero:

- `js/auth.js`
- `js/users.js`
- `js/services/`

Eso evita romper acceso, roles, bajas logicas o la futura migracion a backend.