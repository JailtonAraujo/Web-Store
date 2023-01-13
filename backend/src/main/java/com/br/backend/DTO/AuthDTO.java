package com.br.backend.DTO;

import com.br.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDTO {

    public AuthDTO(User user, String token){
        this.name = user.getName();
        this.lastname = user.getLastname();
        this.token = token;
    }

    private String name;
    private String lastname;
    private String token;
}
