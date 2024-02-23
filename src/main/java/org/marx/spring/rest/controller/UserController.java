package org.marx.spring.rest.controller;

import org.marx.spring.rest.model.User;
import org.marx.spring.rest.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userBootstrap")
public class UserController {

    @GetMapping("/auth")
    public ResponseEntity<User> getAuthUser(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(user.getUser());
    }
}