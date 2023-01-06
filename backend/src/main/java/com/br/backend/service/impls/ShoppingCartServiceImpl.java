package com.br.backend.service.impls;

import com.br.backend.model.Product;
import com.br.backend.model.ShoppingCart;
import com.br.backend.reporitory.ShoppingCartRepository;
import com.br.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    protected ShoppingCartRepository shoppingCartRepository;

    @Override
    public void addProductInCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public List<Product> getProductsCart(Long userId) {

        List<ShoppingCart> cartProducts = shoppingCartRepository.findAllByUserId(userId);

        List<Product> products = cartProducts.stream().map( obj -> obj.getProduct()).collect(Collectors.toList());

        return products;
    }

    @Override
    public void removeProductOnCart(Long cartItenId) {
        shoppingCartRepository.deleteById(cartItenId);
    }
}
