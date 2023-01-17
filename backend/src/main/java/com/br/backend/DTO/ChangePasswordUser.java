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
public class ChangePasswordUser {

    private String newPassword;

    private String oldPassword;

    private User user;

}
