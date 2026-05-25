package com.mlbt.springweb.controller;

import com.mlbt.springweb.model.Venta;
import com.mlbt.springweb.service.VentaService;
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
@RequestMapping("/ventas")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    // GET: consulta y presenta las ventas registradas.
    @GetMapping
    public String listar(Model model) {
        model.addAttribute("ventas", ventaService.listar());
        return "ventas/lista";
    }

    // GET: carga el formulario para crear una venta.
    @GetMapping("/nueva")
    public String nueva(Model model) {
        model.addAttribute("venta", new Venta());
        model.addAttribute("modo", "Crear");
        return "ventas/formulario";
    }

    // POST: registra o actualiza una venta.
    @PostMapping
    public String guardar(@Valid @ModelAttribute("venta") Venta venta, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modo", venta.getId() == null ? "Crear" : "Editar");
            return "ventas/formulario";
        }

        ventaService.guardar(venta);
        return "redirect:/ventas";
    }

    // GET: carga los datos existentes para edición.
    @GetMapping("/{id}/editar")
    public String editar(@PathVariable Long id, Model model) {
        model.addAttribute("venta", ventaService.buscarPorId(id));
        model.addAttribute("modo", "Editar");
        return "ventas/formulario";
    }

    // POST: elimina una venta.
    @PostMapping("/{id}/eliminar")
    public String eliminar(@PathVariable Long id) {
        ventaService.eliminar(id);
        return "redirect:/ventas";
    }
}
