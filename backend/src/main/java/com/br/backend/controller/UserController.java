package com.br.backend.controller;

import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.exception.WrongPasswordException;
import com.br.backend.model.User;
import com.br.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    protected UserService userService;

    @GetMapping("/current-user")
    public ResponseEntity<CurrentUserDTO> getCurrentUser(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(this.userService.getCurrentUser(user.getId()));
    }

    @PutMapping("/")
    public ResponseEntity<Boolean> updateProfile (@RequestBody ChangePasswordUser passwordUser, @AuthenticationPrincipal User user) throws WrongPasswordException {

        passwordUser.setUser(user);

        return ResponseEntity.ok(this.userService.updateProfile(passwordUser));
    }

    @GetMapping("wallet/ask")
    public ResponseEntity<Float> askForMoney( @AuthenticationPrincipal User user ){

        return ResponseEntity.ok(this.userService.askMoreMoney(user));
    }


}
