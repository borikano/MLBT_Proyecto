package com.mlbt.controller;

import com.mlbt.service.InventoryService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "InventoryServlet", urlPatterns = {"/inventory"})
public class InventoryServlet extends HttpServlet {

    private final InventoryService inventoryService = new InventoryService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("items", inventoryService.findAll());
        request.getRequestDispatcher("/WEB-INF/jsp/inventory.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = normalize(request.getParameter("name"));
        int stock = parseInteger(request.getParameter("stock"));

        if (name.isEmpty() || stock < 0) {
            request.setAttribute("message", "Completa producto y stock valido.");
            doGet(request, response);
            return;
        }

        inventoryService.create(name, stock);
        response.sendRedirect(request.getContextPath() + "/inventory");
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }

    private int parseInteger(String value) {
        try {
            return Integer.parseInt(normalize(value));
        } catch (NumberFormatException error) {
            return -1;
        }
    }
}
