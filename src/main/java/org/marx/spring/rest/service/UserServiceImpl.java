package org.marx.spring.rest.service;

import org.marx.spring.rest.model.User;
import org.marx.spring.rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUserList() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void create(User user) {
        if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        } else throw new IllegalArgumentException();

    }

    @Override
    @Transactional
    public void deleteById(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional
    public void update(User updateUser) {
        Optional<User> userFromDB = userRepository.findByEmail(updateUser.getEmail());
        if (userFromDB.isEmpty() ||
                Objects.equals(userFromDB.get().getId(), updateUser.getId())) {
            if (userFromDB.get().getPassword() == null || !userFromDB.get().getPassword()
                    .equals(updateUser.getPassword())) {
                updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
            }
            userRepository.save(updateUser);

        } else throw new IllegalArgumentException();

    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findUserById(long id) {

        return userRepository.findById(id);
    }
}