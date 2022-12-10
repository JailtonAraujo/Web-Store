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

			Category category = new Category().builder().id(3L).name("Moda").build();

			Product product = new Product().builder().name("sollicitudin in integer odio").descrition(
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut deleniti ullam, eos illo quidem vero\r\n"
							+ "                    praesentium repellendus inventore, eaque animi dolore. Accusamus numquam fuga sapiente magnam.\r\n"
							+ "                    Eveniet alias voluptatum nesciunt")
					.price(87.20).isNew(true).quantity(842).category(category).build();

			ImgProduct imgProduct = new ImgProduct().builder()
					.url("https://cdn-icons-png.flaticon.com/512/4223/4223397.png").product(product).build();
			product.setImage(imgProduct);


			this.productRepositoty.save(product);

			Thread.sleep(1000);
		}

	}

}
