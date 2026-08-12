# Comandos de ejecución

## Interfaz React

Ubicación:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"

Instalación:

    pnpm install

Ejecución local:

    pnpm dev

Dirección local:

    http://localhost:5173

Validación:

    pnpm test:run
    pnpm lint
    pnpm build

## API MLBT

Ubicación:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\01_API_NODE"

Instalación:

    pnpm install

Ejecución local:

    pnpm run dev

Dirección local:

    http://localhost:3001

Validación:

    pnpm test
    pnpm check

## Spring Web

Desde la raíz del repositorio:

    .\02_BACK_END/02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END/02_SPRING_WEB\pom.xml spring-boot:run

Dirección local:

    http://localhost:8082

Validación:

    .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test

## Java Web

Desde la raíz del repositorio:

    .\02_BACK_END\03_JAVA_WEB\test.cmd

Compilación:

    .\02_BACK_END\03_JAVA_WEB\package.cmd

Equivalente explícito del wrapper compartido:

    .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\03_JAVA_WEB\pom.xml test
    .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\03_JAVA_WEB\pom.xml clean package
