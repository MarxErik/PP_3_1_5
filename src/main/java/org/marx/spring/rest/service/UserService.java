package org.marx.spring.bootstrap.service;

import org.marx.spring.bootstrap.model.User;

import java.util.List;

public interface UserService {

    List<User> getUserList();

    boolean createUser(User user);

    boolean deleteUser(Long userId);

    User updateUser(User updateUser);

    User findByUsername(String username);

}