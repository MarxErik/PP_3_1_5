package org.marx.spring.rest.controller;


import org.marx.spring.rest.model.Role;
import org.marx.spring.rest.model.User;
import org.marx.spring.rest.security.UserPrincipal;
import org.marx.spring.rest.service.RoleService;
import org.marx.spring.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/adminBootstrap")
public class AdminController {

    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUser() {
        return new ResponseEntity<>(userService.getUserList(), HttpStatus.OK);
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User> showById(@PathVariable("id") long id) {
        return new ResponseEntity<>(userService.findUserById(id).get(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getAuthUser(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(user.getUser());
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> showAllRoles() {
        System.out.println("Work roles");
        List<Role> roleList = roleService.findAllRoles();
        return ResponseEntity.ok(roleList);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> create(@RequestBody User user) {
        System.out.println("Work Post");
        userService.create(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<HttpStatus> update(@RequestBody User user) {
        System.out.println("Work Put");
        userService.update(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        System.out.println("Work Delete");
        userService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}