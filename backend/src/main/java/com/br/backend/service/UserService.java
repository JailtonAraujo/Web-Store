package com.br.backend.service;

import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.model.User;

public interface UserService {

    //Register neu user and return token JWT
    public String registerUser ( User user );

    // get user information
    public CurrentUserDTO getCurrentUser(Long userId);

    // Update information user
    public Boolean updateProfile ( ChangePasswordUser passwordUser );
}
