# Comandos de ejecución

## API MLBT

Ubicación:

```powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\api-mlbt"
```

Instalación de dependencias:

```powershell
pnpm install
```

Ejecución local:

```powershell
node .\src\server.js
```

URL local principal:

```text
http://localhost:3001
```

Endpoints principales:

```text
GET  /
GET  /api/health
POST /api/auth/login
GET  /api/auth/profile
GET  /api/users
GET  /api/inventory
GET  /api/sales
```

## Base de datos

La API usa MySQL/MariaDB mediante XAMPP. El archivo `.env` no se versiona. Se usa `.env.example` como referencia.

## Postman

Colección:

```text
api-mlbt/postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json
```

## Frontend React

Ubicación:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"

Instalación de dependencias:

    pnpm install

Ejecución local:

    pnpm dev

URL local:

    http://localhost:5173

Validación:

    pnpm lint
    pnpm build
