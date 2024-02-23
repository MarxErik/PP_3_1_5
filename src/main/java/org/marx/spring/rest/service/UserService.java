package org.marx.spring.rest.service;

import org.marx.spring.rest.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUserList();

    void create(User user);

    void deleteById(Long userId);

    void update(User updateUser);

    Optional<User> findByUsername(String username);

    Optional<User> findUserById(long id);
//    Optional<User> findByUserEmail(String email);
//
//    List<User> getUserList();
//
//    void create(User user);
//
//    void deleteById(Long userId);
//
//    void update(User updateUser);
//
//    Optional<User> findByUsername(String username);

}