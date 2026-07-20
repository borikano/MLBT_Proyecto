# Cierre de refactor de rutas internas React MLBT

Fecha: 2026-07-19 20:45:01

## Contexto

Este documento deja constancia del cierre del refactor de rutas internas del frontend React del proyecto MLBT - Maria La Bonita Taqueria.

El objetivo fue reemplazar la navegacion basada en anclas internas por paginas reales administradas con React Router.

## Rama principal

- Rama estable: Arawkano
- Pull Request integrado: #12
- Branch temporal eliminado: feature/refactor-rutas-paginas-react

## Rutas finales

### Usuarios

- /usuarios/resumen
- /usuarios/crear
- /usuarios/listado

### Inventario

- /inventario/resumen
- /inventario/registrar
- /inventario/movimientos
- /inventario/tablas

### Ventas

- /ventas/pedido
- /ventas/historial
- /ventas/analisis

## Ajustes funcionales confirmados

- La alerta de usuarios pendientes queda visible antes de Distribucion por rol.
- El historial de movimientos queda dentro de Inventario > Registrar movimiento.
- Ventas inicia en Pedido actual.
- El orden funcional de Ventas queda como Pedido actual, Historial confirmado y Analisis de ventas.

## Validaciones realizadas

- Validacion manual en navegador local.
- Validacion de rutas internas.
- Validacion de sidebar.
- pnpm lint: OK.
- pnpm build: OK.
- git diff --check: OK.
- Verificacion de despliegue publico frontend: OK.

## Observacion documental

El archivo 00_estado_inicial.md conserva referencias a anclas antiguas porque corresponde a una auditoria historica previa al refactor. No representa el estado final del codigo.

## Conclusion

El frontend React queda reorganizado por paginas internas reales, con una estructura mas mantenible y alineada con la navegacion funcional del sistema administrativo MLBT.