package org.marx.spring.rest.security;

import lombok.Getter;
import org.marx.spring.rest.model.Role;
import org.springframework.security.core.GrantedAuthority;

@Getter
public class RolePrincipal implements GrantedAuthority {
    final private Role role;

    public RolePrincipal(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.getName();
    }
}
