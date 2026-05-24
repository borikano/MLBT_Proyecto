<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inventario | MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>Inventario</h1>
            <p class="muted">Consulta mediante GET y registro mediante POST.</p>

            <nav class="nav">
                <a href="${pageContext.request.contextPath}/dashboard">Dashboard</a>
                <a href="${pageContext.request.contextPath}/logout">Cerrar sesion</a>
            </nav>

            <form class="form-grid" action="${pageContext.request.contextPath}/inventory" method="get">
                <label>
                    Buscar producto
                    <input type="text" name="q" placeholder="Nombre del producto">
                </label>
                <button class="button" type="submit">Consultar por GET</button>
            </form>

            <c:if test="${not empty message}">
                <div class="alert alert-info">${message}</div>
            </c:if>

            <form class="form-grid" action="${pageContext.request.contextPath}/inventory" method="post">
                <label>
                    Producto
                    <input type="text" name="name" required>
                </label>
                <label>
                    Stock
                    <input type="number" name="stock" min="0" required>
                </label>
                <button class="button" type="submit">Registrar por POST</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="item" items="${items}">
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.stock}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
