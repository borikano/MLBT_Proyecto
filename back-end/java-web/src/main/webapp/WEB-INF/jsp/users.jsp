<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios | MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>Usuarios</h1>
            <p class="muted">Consulta mediante GET y registro mediante POST.</p>

            <nav class="nav">
                <a href="${pageContext.request.contextPath}/dashboard">Dashboard</a>
                <a href="${pageContext.request.contextPath}/logout">Cerrar sesion</a>
            </nav>

            <form class="form-grid" action="${pageContext.request.contextPath}/users" method="get">
                <label>
                    Buscar usuario
                    <input type="text" name="q" placeholder="Nombre o rol">
                </label>
                <button class="button" type="submit">Consultar por GET</button>
            </form>

            <c:if test="${not empty message}">
                <div class="alert alert-info">${message}</div>
            </c:if>

            <form class="form-grid" action="${pageContext.request.contextPath}/users" method="post">
                <label>
                    Nombre
                    <input type="text" name="name" required>
                </label>
                <label>
                    Correo
                    <input type="email" name="email" required>
                </label>
                <label>
                    Rol
                    <select name="role" required>
                        <option value="">Seleccione un rol</option>
                        <option value="Administrador del sistema">Administrador del sistema</option>
                        <option value="Administrador de tienda">Administrador de tienda</option>
                        <option value="Mesero">Mesero</option>
                        <option value="Cocinero">Cocinero</option>
                    </select>
                </label>
                <button class="button" type="submit">Registrar por POST</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="user" items="${users}">
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
