<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login | MLBT Java Web</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/app.css">
</head>
<body>
    <main class="layout">
        <section class="panel">
            <h1>Inicio de sesion</h1>
            <p class="muted">Formulario JSP procesado por Servlet mediante POST.</p>

            <c:if test="${not empty errorMessage}">
                <div class="alert alert-error">${errorMessage}</div>
            </c:if>

            <form class="form-grid" action="${pageContext.request.contextPath}/login" method="post">
                <label>
                    Correo electronico
                    <input type="email" name="email" value="admin@mlbt.com" required>
                </label>
                <label>
                    Contrasena
                    <input type="password" name="password" value="admin123" required>
                </label>
                <button class="button" type="submit">Ingresar</button>
            </form>
        </section>
    </main>
</body>
</html>
