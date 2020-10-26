package com.artsword.anydraw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@Controller
public class MainController {

    @GetMapping
    public String index() {
        return "draw";
    }

    @GetMapping("/404")
    public String error() {
        return "error/404";
    }

}
