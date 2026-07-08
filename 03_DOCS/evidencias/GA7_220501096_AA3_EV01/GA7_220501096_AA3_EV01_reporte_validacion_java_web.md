# GA7_220501096_AA3_EV01 - Reporte de validación Java Web

## Fecha

2026-05-24 18:45:07

## Rama validada

feature/GA7_220501096_AA3_EV01_MLBT

## Módulo validado

02_BACK_END/03_JAVA_WEB",
",


| Tipo | Cantidad |
|---|---:|
| Java | 14 |
| JSP | 6 |
| CSS | 1 |
| XML | 2 |
| Markdown | 1 |

## Estructura validada

`	ext
02_BACK_END/03_JAVA_WEB/
├── pom.xml
├── README.md
├── src/main/java/com/mlbt/controller/
├── src/main/java/com/mlbt/model/
├── src/main/java/com/mlbt/repository/
├── src/main/java/com/mlbt/service/
└── src/main/webapp/
    ├── index.jsp
    ├── assets/css/
    └── WEB-INF/jsp/
`",
",


| Responsabilidad | Ruta | Estado |
|---|---|---|
| Configuración Maven | 02_BACK_END/03_JAVA_WEB/pom.xml | Validado |
| Java / Controladores | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/controller | Validado |
| Java / Modelos | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/model | Validado |
| Java / Repositorio temporal | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/repository | Validado |
| Java / Servicios | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/service | Validado |
| JSP / Vistas | 02_BACK_END/03_JAVA_WEB/src/main/webapp/WEB-INF/jsp | Validado |
| CSS / Estilos | 02_BACK_END/03_JAVA_WEB/src/main/webapp/assets/css | Validado |
| Index de entrada | 02_BACK_END/03_JAVA_WEB/src/main/webapp/index.jsp | Validado |

## Validación de formularios JSP

Se validó la presencia de formularios con ction, method="get" y method="post".

`	ext
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\inventory.jsp:21: <form class="form-grid" action="${pageContext.request.contextPath}/inventory" method="get">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\inventory.jsp:33: <form class="form-grid" action="${pageContext.request.contextPath}/inventory" method="post">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\login.jsp:20: <form class="form-grid" action="${pageContext.request.contextPath}/login" method="post">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\sales.jsp:21: <form class="form-grid" action="${pageContext.request.contextPath}/sales" method="get">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\sales.jsp:33: <form class="form-grid" action="${pageContext.request.contextPath}/sales" method="post">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\users.jsp:21: <form class="form-grid" action="${pageContext.request.contextPath}/users" method="get">
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\webapp\WEB-INF\jsp\users.jsp:33: <form class="form-grid" action="${pageContext.request.contextPath}/users" method="post">
`",
",


Se validó la presencia de anotaciones @WebServlet y métodos doGet / doPost.

`	ext
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\DashboardServlet.java:11: @WebServlet(name = "DashboardServlet", urlPatterns = {"/dashboard"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\DashboardServlet.java:15: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\InventoryServlet.java:11: @WebServlet(name = "InventoryServlet", urlPatterns = {"/inventory"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\InventoryServlet.java:17: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\InventoryServlet.java:24: protected void doPost(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\InventoryServlet.java:32: doGet(request, response);
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\LoginServlet.java:12: @WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\LoginServlet.java:18: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\LoginServlet.java:24: protected void doPost(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\LogoutServlet.java:10: @WebServlet(name = "LogoutServlet", urlPatterns = {"/logout"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\LogoutServlet.java:14: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\SalesServlet.java:11: @WebServlet(name = "SalesServlet", urlPatterns = {"/sales"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\SalesServlet.java:17: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\SalesServlet.java:24: protected void doPost(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\SalesServlet.java:33: doGet(request, response);
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\UsersServlet.java:11: @WebServlet(name = "UsersServlet", urlPatterns = {"/users"})
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\UsersServlet.java:17: protected void doGet(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\UsersServlet.java:24: protected void doPost(HttpServletRequest request, HttpServletResponse response)
E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\03_JAVA_WEB\src\main\java\com\mlbt\controller\UsersServlet.java:33: doGet(request, response);
`",
",


El archivo index.jsp fue revisado para confirmar que no concentre lógica sensible.

Resultado:

`	ext
Sin hallazgos sensibles en index.
`",
",


`	ext
Maven no esta disponible en PATH. No se ejecuto compilacion local.
`",
",


El módulo 02_BACK_END/03_JAVA_WEB queda estructurado como complemento técnico de la evidencia GA7_220501096_AA3_EV01. La implementación separa Java, JSP, CSS, configuración y documentación, e incluye formularios con métodos GET y POST procesados mediante Servlets.
