package com.br.backend.controller;

import com.br.backend.model.AddressDelivery;
import com.br.backend.model.User;
import com.br.backend.service.AddressServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/address")
public class AddressController {

    @Autowired
    protected AddressServices addressServices;

    @PostMapping("/")
    public ResponseEntity<AddressDelivery> saveAddress
            (@RequestBody AddressDelivery addressDelivery,
             @AuthenticationPrincipal User user)
    {
        addressDelivery.setUser(user);

        return new ResponseEntity<AddressDelivery>(this.addressServices.saveAddress(addressDelivery), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<AddressDelivery>> getAllAddress( @AuthenticationPrincipal User user ){

        return ResponseEntity.ok(this.addressServices.getAllAddressByUserId(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAddress(@PathVariable(name = "id") Long id, @AuthenticationPrincipal User user){

        this.addressServices.deleteAddressByIdAndUserId(id, user.getId());

        return ResponseEntity.ok(true);

    }

    @GetMapping("/frete-prazo")
    public ResponseEntity<String> calcFretePrazo( @RequestParam("cepDestino") String cepDestino ) throws IOException, InterruptedException {

        return ResponseEntity.ok(this.addressServices.calcFretePrazo("70002900", cepDestino).toString());
    }

}
