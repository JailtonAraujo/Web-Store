package com.br.backend.service;

import com.br.backend.model.AddressDelivery;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public interface AddressServices {

    public AddressDelivery saveAddress(AddressDelivery addressDelivery);

    public List<AddressDelivery> getAllAddressByUserId(Long userId);

    public void deleteAddressByIdAndUserId(Long addressId, Long userId);

    // request PRAZO and FRETE in CORREIOS service http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx
    public JSONObject calcFretePrazo(String cepOrigin, String cepDestiny) throws IOException, InterruptedException;
}
