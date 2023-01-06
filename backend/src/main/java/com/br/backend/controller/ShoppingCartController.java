package com.br.backend.controller;

import com.br.backend.model.Product;
import com.br.backend.model.ShoppingCart;
import com.br.backend.model.User;
import com.br.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/cart")
public class ShoppingCartController {

    @Autowired
    protected ShoppingCartService shoppingCartService;

    @PostMapping("/")
    public ResponseEntity<String> addProdcuctInCart(@RequestBody Product product){

        User user = new User();
        user.setId(1L);

        ShoppingCart shoppingCart = new ShoppingCart().builder().product(product).user(user).build();

        this.shoppingCartService.addProductInCart(shoppingCart);

        return new ResponseEntity<String>("Success!", HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getProductsCart (){

        return ResponseEntity.ok(this.shoppingCartService.getProductsCart(1L));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> removeProductOnCart ( @PathVariable(name = "id") Long id ){

        this.shoppingCartService.removeProductOnCart(id);

        return ResponseEntity.ok(true);
    }
}
