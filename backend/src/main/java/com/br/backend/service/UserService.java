package com.br.backend.service;

import com.br.backend.DTO.AuthResponse;
import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.exception.WrongPasswordException;
import com.br.backend.model.User;

public interface UserService {

    // get user information
    public CurrentUserDTO getCurrentUser(Long userId);

    // Update information user
    public Boolean updateProfile ( ChangePasswordUser passwordUser ) throws WrongPasswordException;
}
