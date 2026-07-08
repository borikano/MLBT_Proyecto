package com.mlbt.controller;

import com.mlbt.service.SaleService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "SalesServlet", urlPatterns = {"/sales"})
public class SalesServlet extends HttpServlet {

    private final SaleService saleService = new SaleService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("sales", saleService.findAll());
        request.getRequestDispatcher("/WEB-INF/jsp/sales.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String productName = normalize(request.getParameter("productName"));
        int quantity = parseInteger(request.getParameter("quantity"));
        double total = parseDouble(request.getParameter("total"));

        if (productName.isEmpty() || quantity <= 0 || total < 0) {
            request.setAttribute("message", "Completa producto, cantidad y total valido.");
            doGet(request, response);
            return;
        }

        saleService.create(productName, quantity, total);
        response.sendRedirect(request.getContextPath() + "/sales");
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

    private double parseDouble(String value) {
        try {
            return Double.parseDouble(normalize(value));
        } catch (NumberFormatException error) {
            return -1;
        }
    }
}
