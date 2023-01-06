package com.br.backend.service;

import com.br.backend.model.Product;
import com.br.backend.model.ShoppingCart;

import java.util.List;

public interface ShoppingCartService {

    public void addProductInCart (ShoppingCart shoppingCart);

    public List<Product> getProductsCart (Long userId);

    public void removeProductOnCart (Long productId, Long userId);

}
