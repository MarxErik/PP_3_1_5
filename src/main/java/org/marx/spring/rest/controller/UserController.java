package org.marx.spring.bootstrap.controller;

import org.marx.spring.bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String show(Principal principal, Model model) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "userBootstrap";
    }

    @GetMapping
    public String loginPage() {
        return "login";
    }
}
