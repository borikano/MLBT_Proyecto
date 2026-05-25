package com.mlbt.springweb.controller;

import com.mlbt.springweb.model.Usuario;
import com.mlbt.springweb.service.UsuarioService;
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
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // GET: consulta y presenta el listado de usuarios.
    @GetMapping
    public String listar(Model model) {
        model.addAttribute("usuarios", usuarioService.listar());
        return "usuarios/lista";
    }

    // GET: carga el formulario para crear un usuario.
    @GetMapping("/nuevo")
    public String nuevo(Model model) {
        model.addAttribute("usuario", new Usuario());
        model.addAttribute("modo", "Crear");
        return "usuarios/formulario";
    }

    // POST: registra o actualiza un usuario.
    @PostMapping
    public String guardar(@Valid @ModelAttribute("usuario") Usuario usuario, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modo", usuario.getId() == null ? "Crear" : "Editar");
            return "usuarios/formulario";
        }

        usuarioService.guardar(usuario);
        return "redirect:/usuarios";
    }

    // GET: carga los datos existentes para edición.
    @GetMapping("/{id}/editar")
    public String editar(@PathVariable Long id, Model model) {
        model.addAttribute("usuario", usuarioService.buscarPorId(id));
        model.addAttribute("modo", "Editar");
        return "usuarios/formulario";
    }

    // POST: elimina un usuario.
    @PostMapping("/{id}/eliminar")
    public String eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return "redirect:/usuarios";
    }
}
