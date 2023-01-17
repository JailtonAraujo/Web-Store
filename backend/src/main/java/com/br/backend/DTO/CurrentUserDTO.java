package com.br.backend.DTO;

import com.br.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CurrentUserDTO implements Serializable {

    private static final long serialVersionUID = 735285561634613245L;

    public CurrentUserDTO (User user){
       this.name = user.getName();
       this.lastname = user.getLastname();
       this.username = user.getUsername();
       this.wallet = user.getWallet();
       this.cpf = user.getCpf();
    }

    private String name;

    private String lastname;

    private String username;

    private Float wallet;

    private String cpf;

}
