package com.mlbt.springweb.controller;

import com.mlbt.springweb.model.ProductoInventario;
import com.mlbt.springweb.service.InventarioService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/inventario")
public class InventarioController {

    private final InventarioService inventarioService;

    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    // GET: consulta y presenta el inventario.
    @GetMapping
    public String listar(Model model) {
        model.addAttribute("productos", inventarioService.listar());
        return "inventario/lista";
    }

    // GET: carga el formulario para crear un producto.
    @GetMapping("/nuevo")
    public String nuevo(Model model) {
        model.addAttribute("producto", new ProductoInventario());
        model.addAttribute("modo", "Crear");
        return "inventario/formulario";
    }

    // POST: registra o actualiza un producto.
    @PostMapping
    public String guardar(@Valid @ModelAttribute("producto") ProductoInventario producto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modo", producto.getId() == null ? "Crear" : "Editar");
            return "inventario/formulario";
        }

        inventarioService.guardar(producto);
        return "redirect:/inventario";
    }

    // GET: carga los datos existentes para edición.
    @GetMapping("/{id}/editar")
    public String editar(@PathVariable Long id, Model model) {
        model.addAttribute("producto", inventarioService.buscarPorId(id));
        model.addAttribute("modo", "Editar");
        return "inventario/formulario";
    }

    // POST: elimina un producto.
    @PostMapping("/{id}/eliminar")
    public String eliminar(@PathVariable Long id) {
        inventarioService.eliminar(id);
        return "redirect:/inventario";
    }
}
