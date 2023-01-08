package com.br.backend.service.impls;

import com.br.backend.model.AddressDelivery;
import com.br.backend.reporitory.AddressRepository;
import com.br.backend.service.AddressServices;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressServices {

    @Autowired
    protected AddressRepository addressRepository;

    @Override
    public AddressDelivery saveAddress(AddressDelivery addressDelivery) {

        return addressRepository.save(addressDelivery);
    }

    @Override
    public List<AddressDelivery> getAllAddressByUserId(Long userId) {
        return addressRepository.findAllByUserId(userId);
    }

    @Override
    public void deleteAddressByIdAndUserId(Long addressId, Long userId) {
            addressRepository.deleteByIdAndUserId(addressId, userId);
    }

    @Override
    public JSONObject calcFretePrazo(String cepOrigin, String cepDestiny) throws IOException, InterruptedException {

        //String urls = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=09146920&sDsSenha=123456&sCepOrigem=70002900&sCepDestino=71939360&nVlPeso=1&nCdFormato=1&nVlComprimento=30&nVlAltura=30&nVlLargura=30&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=40010&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3";

        StringBuilder url = new StringBuilder("http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=09146920&sDsSenha=123456&");
        url.append("sCepOrigem=").append(cepOrigin)
                .append("&sCepDestino=").append(cepDestiny)
                .append("&nVlPeso=1&nCdFormato=1&nVlComprimento=30&nVlAltura=30&nVlLargura=30&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=40010&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3");

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest httpRequest = HttpRequest.newBuilder().GET().timeout(Duration.ofSeconds(10)).uri(URI.create(url.toString()))
                .build();

        HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        JSONObject object = XML.toJSONObject(response.body());

        return object;
    }

}
