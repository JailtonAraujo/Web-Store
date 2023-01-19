package com.br.backend.service;

import com.br.backend.DTO.AuthResponse;
import com.br.backend.model.User;
import com.br.backend.reporitory.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthResponse register(User request) {

        request.setPassword(passwordEncoder.encode(request.getPassword()));

        request.setWallet(1000F);

        var userCreated = repository.save(request);

        var jwtToken = jwtService.generateToken(userCreated);

        var authResponse = new AuthResponse(userCreated,jwtToken);

        return authResponse;
    }

    public AuthResponse authenticate(User request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );


        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        var authResponse = new AuthResponse(user,jwtToken);

        return authResponse;

    }

}
