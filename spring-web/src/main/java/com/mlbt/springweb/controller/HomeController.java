package com.mlbt.springweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // GET: punto de entrada del módulo Spring Web.
    @GetMapping({"/", "/dashboard"})
    public String dashboard() {
        return "dashboard";
    }
}
