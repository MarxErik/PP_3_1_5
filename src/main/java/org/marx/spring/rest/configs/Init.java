package org.marx.spring.rest.configs;


import org.marx.spring.rest.model.Role;
import org.marx.spring.rest.model.User;
import org.marx.spring.rest.service.RoleService;
import org.marx.spring.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Init(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void initUsers() {

        Role adminRole = new Role("ADMIN");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);

        roleService.createRole(adminRole);

        Role userRole = new Role("USER");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);

        roleService.createRole(userRole);

        User admin = new User("ADMIN", "ADMIN", (byte) 20, "admin@mail.ru", "ADMIN", adminRoles);

        userService.createUser(admin);

        User user = new User("user", "user", (byte) 20, "user@mail.ru", "user", userRoles);

        userService.createUser(user);
    }
}