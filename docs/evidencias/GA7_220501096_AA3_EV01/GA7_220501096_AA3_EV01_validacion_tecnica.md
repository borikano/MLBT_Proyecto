# Validación técnica GA7-220501096-AA3-EV01

## Propósito

Este documento registra comandos de validación técnica para revisar la estructura del proyecto MLBT durante la preparación de la evidencia.

## Comandos de inspección usados

### Inventario de archivos HTML, JSP y JavaScript

```powershell
Get-ChildItem -Recurse -Include *.html,*.jsp,*.js | Select-Object FullName
```

### Búsqueda de formularios HTML

```powershell
Get-ChildItem -Recurse -Include *.html | Select-String -Pattern "<form|</form>|method=|action=" -CaseSensitive:$false
```

### Búsqueda de lógica submit y persistencia

```powershell
Get-ChildItem -Recurse -Include *.js | Select-String -Pattern "addEventListener\(`"submit`"|addEventListener\('submit'|preventDefault|saveUsers|saveInventory|saveSales|localStorage" -CaseSensitive:$false
```

### Búsqueda de páginas JSP

```powershell
Get-ChildItem -Recurse -Include *.jsp
```

## Resultado técnico actual

| Elemento validado | Resultado |
|---|---|
| Archivos HTML | Identificados en index.html y carpeta pages. |
| Formularios HTML | Identificados en login, usuarios, inventario y ventas. |
| Lógica JavaScript | Identificada en carpeta js. |
| Persistencia local | Identificada mediante localStorage. |
| Archivos JSP | No identificados en la versión actual. |
| Servlets | No identificados en la versión actual. |

## Conclusión

El proyecto cuenta con estructura web frontend funcional y documentada. La evidencia se apoya en la codificación existente, la organización del repositorio, la trazabilidad de formularios y la documentación técnica complementaria.

