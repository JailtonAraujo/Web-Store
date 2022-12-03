package com.br.backend;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.br.backend.model.Category;
import com.br.backend.model.ImgProduct;
import com.br.backend.model.Product;
import com.br.backend.reporitory.ProductRepositoty;
import com.br.backend.service.ProductService;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private ProductRepositoty productRepositoty;

	@Test
	void contextLoads() {
	}

	@Test
	public void demiData() throws InterruptedException {

		for (int i = 0; i <= 10; i++) {

			Category category = new Category().builder().id(1L).name("Eletronicos").build();

			Product product = new Product().builder().name("Lorem ipsum dapibus aenean").descrition(
					"Lorem ipsum dapibus aenean nullam vehicula senectus aptent lorem consectetur, purus duis commodo cursus nec tortor lobortis taciti eleifend ut, feugiat sollicitudin in integer odio mollis potenti pellentesque est, proin primis laoreet venenatis sed netus aenean enim. habitant scelerisque lacus porta placerat platea hendrerit dictumst senectus eleifend, malesuada interdum justo vitae quisque vitae purus litora nibh, in odio dolor ultrices in sed sollicitudin sociosqu. posuere laoreet aenean diam orci nisl cubilia augue, quam mauris suspendisse vestibulum urna etiam,")
					.price(50.0).isNew(true).quantity(40).category(category).build();

			ImgProduct imgProduct = new ImgProduct().builder()
					.url("https://cdn-icons-png.flaticon.com/512/3659/3659898.png").product(product).build();

			List<ImgProduct> imgProducts = new ArrayList<ImgProduct>();
			imgProducts.add(imgProduct);

			product.setImages(imgProducts);

			this.productRepositoty.save(product);

			Thread.sleep(1000);
		}

	}

}
