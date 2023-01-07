package com.br.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/address")
public class AddressController {

    @PostMapping("/")
    public ResponseEntity<Boolean> saveAddress (){

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<Boolean> getAllAddress(){
        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAddress( @PathVariable(name = "id") Long id ){

        return ResponseEntity.ok(true);

    }

}
