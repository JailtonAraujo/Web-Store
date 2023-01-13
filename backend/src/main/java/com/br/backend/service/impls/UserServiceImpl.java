package com.br.backend.service.impls;

import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.model.User;
import com.br.backend.reporitory.UserRepository;
import com.br.backend.service.UserService;
import jakarta.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    protected UserRepository userRepository;

    @Override
    public String registerUser(User user) {
        userRepository.save(user);
        return "Success!";
    }

    @Override
    public CurrentUserDTO getCurrentUser(Long userId) {

        Optional<User> optional = userRepository.findById(userId);

        if(optional.isPresent()){
            CurrentUserDTO currentUserDTO = new CurrentUserDTO(optional.get());
            return currentUserDTO;
        }

        throw new NoResultException("User not found!");
    }

    @Override
    public Boolean updateProfile(ChangePasswordUser passwordUser) {

        //TO DO
        //Verify old password user

        userRepository.updateUserPassword(passwordUser.getNewPassword(), passwordUser.getUserId());

        return true;
    }
}
