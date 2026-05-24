package com.mlbt.controller;

import com.mlbt.service.AuthService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

    private final AuthService authService = new AuthService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (authService.isValidLogin(email, password)) {
            HttpSession session = request.getSession(true);
            session.setAttribute("authenticatedUser", "Administrador MLBT");
            session.setAttribute("authenticatedRole", "Administrador del sistema");
            response.sendRedirect(request.getContextPath() + "/dashboard");
            return;
        }

        request.setAttribute("errorMessage", "Credenciales invalidas. Verifica los datos ingresados.");
        request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
    }
}
