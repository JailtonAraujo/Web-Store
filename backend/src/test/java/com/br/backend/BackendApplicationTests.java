package com.br.backend;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.br.backend.model.Category;
import com.br.backend.model.ImgProduct;
import com.br.backend.model.Product;
import com.br.backend.reporitory.ProductRepositoty;

@SpringBootTest
class BackendApplicationTests {

//	@Autowired
//	private ProductRepositoty productRepositoty;

	@Test
	void contextLoads() {
	}

	@Test
	public void demiData() throws InterruptedException {

//		for (int i = 0; i <= 10; i++) {
//
//			Category category = new Category().builder().id(1L).name("Eletronicos").build();
//
//			Product product = new Product().builder().name("sollicitudin in integer odio").descrition(
//					"Sem etiam turpis etiam interdum fusce cras aliquam varius, sagittis enim aenean quisque dictumst augue aliquet, neque pellentesque leo neque dictum" +
//							"ac cubilia. diam nulla est sodales odio quam donec bibendum porta")
//					.price(49.3).isNew(true).quantity(470).category(category).build();
//
//			ImgProduct imgProduct = new ImgProduct().builder()
//					.url("https://cdn-icons-png.flaticon.com/512/3659/3659898.png").product(product).build();
//			product.setImage(imgProduct);
//
//
//			this.productRepositoty.save(product);
//
//			Thread.sleep(1000);
//		}

	}
	
	@Test
	public void testeRequest () throws IOException, InterruptedException {
//
//		StringBuilder url = new StringBuilder("http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=09146920&sDsSenha=123456&");
//		url.append("sCepOrigem=").append("70002900").append("&sCepDestino=").append("71939360")
//		.append("&nVlPeso=1&nCdFormato=1&nVlComprimento=30&nVlAltura=30&nVlLargura=30&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=40010&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3");
//
//		HttpClient client = HttpClient.newHttpClient();
//
//		HttpRequest httpRequest = HttpRequest.newBuilder()
//				.GET()
//				.timeout(Duration.ofSeconds(10))
//				.uri(URI.create(url.toString()))
//				.build();
//
//		HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
//
//		JSONObject object;
//		try {
//			object = XML.toJSONObject(response.body());
//			System.out.println(object);
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
				
		
	}

}
