package com.restapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restapi.entity.User;
import com.restapi.repository.UserRepository;
import com.restapi.exception.ResourceNotFoundException;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public User register(User user) {
        log.info("Registering user {}", user.getUsername());

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        return repo.save(user);
    }

    public User findByUsername(String username) {
        log.info("Fetching user {}", username);

        return repo.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found {}", username);
                    return new ResourceNotFoundException("User not found");
                });
    }

    public User update(Long id, User user) {
        log.info("Updating user {}", id);

        User existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        existing.setUsername(user.getUsername());
        existing.setPassword(encoder.encode(user.getPassword()));

        return repo.save(existing);
    }

    public void delete(Long id) {
        log.info("Deleting user {}", id);

        User user = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        repo.delete(user);
    }
}