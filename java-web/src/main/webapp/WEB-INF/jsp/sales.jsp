<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ventas | MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>Ventas</h1>
            <p class="muted">Consulta mediante GET y registro mediante POST.</p>

            <nav class="nav">
                <a href="${pageContext.request.contextPath}/dashboard">Dashboard</a>
                <a href="${pageContext.request.contextPath}/logout">Cerrar sesion</a>
            </nav>

            <form class="form-grid" action="${pageContext.request.contextPath}/sales" method="get">
                <label>
                    Buscar venta
                    <input type="text" name="q" placeholder="Producto o referencia">
                </label>
                <button class="button" type="submit">Consultar por GET</button>
            </form>

            <c:if test="${not empty message}">
                <div class="alert alert-info">${message}</div>
            </c:if>

            <form class="form-grid" action="${pageContext.request.contextPath}/sales" method="post">
                <label>
                    Producto vendido
                    <input type="text" name="productName" required>
                </label>
                <label>
                    Cantidad
                    <input type="number" name="quantity" min="1" required>
                </label>
                <label>
                    Total
                    <input type="number" name="total" min="0" step="0.01" required>
                </label>
                <button class="button" type="submit">Registrar por POST</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="sale" items="${sales}">
                        <tr>
                            <td>${sale.id}</td>
                            <td>${sale.productName}</td>
                            <td>${sale.quantity}</td>
                            <td>${sale.total}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
