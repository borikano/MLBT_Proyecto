<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard | MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>Dashboard administrativo</h1>
            <p>Usuario: <strong>${sessionScope.authenticatedUser}</strong></p>
            <p>Rol: <strong>${sessionScope.authenticatedRole}</strong></p>

            <nav class="nav">
                <a href="${pageContext.request.contextPath}/users">Usuarios</a>
                <a href="${pageContext.request.contextPath}/inventory">Inventario</a>
                <a href="${pageContext.request.contextPath}/sales">Ventas</a>
                <a href="${pageContext.request.contextPath}/logout">Cerrar sesion</a>
            </nav>
        </section>
    </main>
</body>
</html>
