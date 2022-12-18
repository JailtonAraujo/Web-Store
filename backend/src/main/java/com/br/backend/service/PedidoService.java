package com.br.backend.service;

import java.io.IOException;

import org.json.JSONObject;

public interface PedidoService {
	
	// request PRAZO and FRETE in CORREIOS service http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx
	public JSONObject calcFretePrazo(String cepOrigin, String cepDestiny) throws IOException, InterruptedException; 

}
