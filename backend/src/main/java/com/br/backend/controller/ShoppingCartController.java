package com.br.backend.controller;

import com.br.backend.model.Product;
import com.br.backend.model.ShoppingCart;
import com.br.backend.model.User;
import com.br.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/cart")
public class ShoppingCartController {

    @Autowired
    protected ShoppingCartService shoppingCartService;

    @PostMapping("/")
    public ResponseEntity<Boolean> addProductInCart(@RequestBody Product product, @AuthenticationPrincipal User user){

        ShoppingCart shoppingCart = new ShoppingCart().builder().product(product).user(user).build();

        this.shoppingCartService.addProductInCart(shoppingCart);

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getProductsCart ( @AuthenticationPrincipal User user ){

        return ResponseEntity.ok(this.shoppingCartService.getProductsCart(user.getId()));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> removeProductOnCart ( @PathVariable(name = "id") Long id, @AuthenticationPrincipal User user ){

        this.shoppingCartService.removeProductOnCart(id,user.getId());

        return ResponseEntity.ok(true);
    }
}
