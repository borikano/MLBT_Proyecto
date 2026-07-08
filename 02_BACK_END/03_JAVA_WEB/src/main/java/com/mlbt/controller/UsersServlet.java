package com.mlbt.controller;

import com.mlbt.service.UserService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UsersServlet", urlPatterns = {"/users"})
public class UsersServlet extends HttpServlet {

    private final UserService userService = new UserService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("users", userService.findAll());
        request.getRequestDispatcher("/WEB-INF/jsp/users.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = normalize(request.getParameter("name"));
        String email = normalize(request.getParameter("email"));
        String role = normalize(request.getParameter("role"));

        if (name.isEmpty() || email.isEmpty() || role.isEmpty()) {
            request.setAttribute("message", "Completa nombre, correo y rol.");
            doGet(request, response);
            return;
        }

        userService.create(name, email, role);
        response.sendRedirect(request.getContextPath() + "/users");
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
