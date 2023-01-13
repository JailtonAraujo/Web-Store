package com.br.backend.controller;

import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.model.User;
import com.br.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    protected UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser (@RequestBody User user){
        return new ResponseEntity<String>( this.userService.registerUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/current-user")
    public ResponseEntity<CurrentUserDTO> getCurrentUser(){
        return ResponseEntity.ok(this.userService.getCurrentUser(1L));
    }

    @PutMapping("/")
    public ResponseEntity<Boolean> updateProfile (@RequestBody ChangePasswordUser passwordUser){

        passwordUser.setUserId(1L);

        return ResponseEntity.ok(this.userService.updateProfile(passwordUser));
    }

    @GetMapping("Wallet/ask")
    public ResponseEntity<Float> askForMoney(){
        return null;
    }


}
