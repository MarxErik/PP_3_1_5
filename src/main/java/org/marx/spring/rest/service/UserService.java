package org.marx.spring.rest.service;

import org.marx.spring.rest.model.User;

import java.util.List;

public interface UserService {

    List<User> getUserList();

    boolean createUser(User user);

    boolean deleteUser(Long userId);

    User updateUser(User updateUser);

    User findByUsername(String username);

    User findUserById(long id);

}