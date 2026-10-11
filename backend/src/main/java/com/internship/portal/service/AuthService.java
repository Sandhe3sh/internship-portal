
package com.internship.portal.service;

import com.internship.portal.config.JwtUtil;
import com.internship.portal.dto.AuthRequest;
import com.internship.portal.dto.AuthResponse;
import com.internship.portal.dto.RegisterRequest;
import com.internship.portal.entity.User;
import com.internship.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest req) {

        if (req.getEmail() == null || req.getEmail().isBlank()
                || req.getPassword() == null || req.getPassword().isBlank()
                || req.getName() == null || req.getName().isBlank()) {
            throw new IllegalArgumentException(
                "Name, email and password are required"
            );
        }

        String email = req.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(req.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setDepartment(req.getDepartment());
        user.setBatch(req.getBatch());
        user.setRole(User.Role.STUDENT);

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(
            savedUser.getEmail(),
            savedUser.getRole().name()
        );

        return new AuthResponse(
            token,
            savedUser.getRole().name(),
            savedUser.getName(),
            savedUser.getId(),
            savedUser.getDepartment(),
            savedUser.getBatch()
        );
    }

    public AuthResponse login(AuthRequest req) {

        if (req.getEmail() == null || req.getEmail().isBlank()
                || req.getPassword() == null || req.getPassword().isEmpty()) {
            throw new IllegalArgumentException(
                "Email and password are required"
            );
        }

        String email = req.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                new IllegalArgumentException("Invalid credentials")
            );

        if (user.getPassword() == null ||
                !passwordEncoder.matches(
                    req.getPassword(),
                    user.getPassword()
                )) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
            user.getEmail(),
            user.getRole().name()
        );

        return new AuthResponse(
            token,
            user.getRole().name(),
            user.getName(),
            user.getId(),
            user.getDepartment(),
            user.getBatch()
        );
    }
}
