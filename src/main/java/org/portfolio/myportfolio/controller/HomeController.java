package org.portfolio.myportfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Ajay Dharrsan T R - Full Stack Developer");
        model.addAttribute("description", "Portfolio of Ajay Dharrsan T R, a passionate full stack developer specializing in Java and Spring Boot");
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About - Ajay Dharrsan T R");
        return "about";
    }

    @GetMapping("/projects")
    public String projects(Model model) {
        model.addAttribute("title", "Projects - Ajay Dharrsan T R");
        return "projects";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("title", "Contact - Ajay Dharrsan T R");
        return "contact";
    }

    @GetMapping("/project/{id}")
    public String projectDetail(@PathVariable String id, Model model) {
        model.addAttribute("title", "Project Details - Ajay Dharrsan T R");
        model.addAttribute("projectId", id);
        return "project-detail";
    }
}
