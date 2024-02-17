package org.marx.spring.rest.service;


import org.marx.spring.rest.model.Role;

import java.util.List;

public interface RoleService {
    void createRole(Role role);

    List<Role> findAllRoles();
}