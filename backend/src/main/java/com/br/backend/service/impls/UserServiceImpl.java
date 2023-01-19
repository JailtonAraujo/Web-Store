package com.br.backend.service.impls;

import com.br.backend.DTO.ChangePasswordUser;
import com.br.backend.DTO.CurrentUserDTO;
import com.br.backend.exception.WrongPasswordException;
import com.br.backend.model.User;
import com.br.backend.reporitory.UserRepository;
import com.br.backend.service.UserService;
import jakarta.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public Boolean updateProfile(ChangePasswordUser passwordUser) throws WrongPasswordException {

        //TO DO
        //Verify old password user

        if( !passwordEncoder.matches(passwordUser.getOldPassword(),passwordUser.getUser().getPassword())){
            throw new WrongPasswordException("Wrong password!");
        }

        userRepository.updateUserPassword(passwordEncoder.encode(passwordUser.getNewPassword()), passwordUser.getUser().getId());

        return true;
    }

    @Override
    public Float askMoreMoney(User user) {

        if(user.getWallet() > 700){
            return 0F;
        }

        userRepository.changeWallet( (user.getWallet()+1000F),user.getId());

        return 1000F;
    }



}
