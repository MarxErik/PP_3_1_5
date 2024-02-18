package org.marx.spring.rest.controller;


import org.marx.spring.rest.model.Role;
import org.marx.spring.rest.model.User;
import org.marx.spring.rest.service.RoleService;
import org.marx.spring.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<User>> getUserList() {
        System.out.println("Work users");
        List<User> users = userService.getUserList();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(userService.getUserList(), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        System.out.println("Work id");
        User user = userService.findUserById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getAuthUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        System.out.println("Work roles");
        List<Role> roleList = roleService.findAllRoles();
        return ResponseEntity.ok(roleList);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> saveNewUser(@RequestBody User user) {
        System.out.println("Work Post");
        userService.createUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        System.out.println("Work Put");
        userService.updateUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        System.out.println("Work Delete");
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}