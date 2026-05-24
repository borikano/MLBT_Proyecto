<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>MLBT Java Web</h1>
            <p class="muted">Modulo complementario con JSP, Servlets, GET y POST.</p>
            <nav class="nav">
                <a href="${pageContext.request.contextPath}/login">Iniciar sesion</a>
                <a href="${pageContext.request.contextPath}/dashboard">Dashboard</a>
            </nav>
        </section>
    </main>
</body>
</html>
