package org.marx.spring.rest.service;

import org.marx.spring.rest.model.User;
import org.marx.spring.rest.repositories.UserRepository;
import org.marx.spring.rest.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
//        User userFromDB = userRepository.findByUsername(user.getUsername());
//        if (userFromDB != null) {
//            return false;
//        }
//        userRepository.save(user);
//        return true;

//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        userRepository.save(user);


//        Optional <User> userFromDB = userRepository.findByEmail(user.getEmail());
        if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        } else throw new IllegalArgumentException();

    }

    @Override
    @Transactional
    public void deleteById(Long userId) {
//        if (userRepository.findById(userId).isPresent()) {
//            userRepository.deleteById(userId);
//            return true;
//        }
//        return false;
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional
    public void update(User updateUser) {
//        return userRepository.save(updateUser);
        // Обновить юзера
        // Если емейл уникальный
        // Если емейл не уникальный, но айдишник совпадает
        Optional <User> userFromDB = userRepository.findByEmail(updateUser.getEmail());
        if (userFromDB.isEmpty() ||
                Objects.equals(userFromDB.get().getId(), updateUser.getId())) {
            updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
            userRepository.save(updateUser);

        } else throw new IllegalArgumentException();

//        if (userRepository.findById(updateUser.getId()).isPresent()) {
//            updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
//            if (userRepository.findByEmail(updateUser.getEmail()).isEmpty()) {
//                updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
//                userRepository.save(updateUser);
//            } else throw new IllegalArgumentException();
//        } else {
//            throw new UsernameNotFoundException("User not found");
//        }
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findUserById(long id) {
//        Optional<User> foundUser = userRepository.findById(id);
//        return foundUser.orElse(null);
        return userRepository.findById(id);
    }
}