package pl.zawadzki.bookstore.service.impl;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.zawadzki.bookstore.dto.PasswordDto;
import pl.zawadzki.bookstore.dto.UserDto;
import pl.zawadzki.bookstore.model.User;
import pl.zawadzki.bookstore.repository.UserRepository;
import pl.zawadzki.bookstore.service.CurrentUserService;
import pl.zawadzki.bookstore.service.UserService;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    private CurrentUserService currentUserService;
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(CurrentUserServiceImpl currentUserService,
                           UserRepository repository,
                           PasswordEncoder encoder) {
        this.currentUserService = currentUserService;
        this.repository = repository;
        this.passwordEncoder = encoder;
    }


    /**
     * Returns information about user
     *
     * @return {@link User}
     */
    public User getUserInfo() {
        return currentUserService.getCurrentUser();
    }

    /**
     * Updates {@link User} information.
     *
     * @param userDto {@link UserDto}
     */
    public void updateUserInfo(UserDto userDto) {
        User updateUser = currentUserService.getCurrentUser();
        updateUser.setUsername(userDto.getUsername());
        updateUser.setEmail(userDto.getEmail());
        updateUser.setPhone(userDto.getPhone());
        updateUser.setAddress(userDto.getAddress());
        repository.save(updateUser);
    }

    /**
     * Updates {@link User} password.
     *
     * @param passwordDto {@link PasswordDto}
     * @return true if success false if not.
     */
    public boolean changePassword(PasswordDto passwordDto) {
        User updateUser = currentUserService.getCurrentUser();
        if (passwordEncoder.matches(passwordDto.getOldPassword(), updateUser.getPassword())) {
            String encodedNewPassword = passwordEncoder.encode(passwordDto.getNewPassword());
            updateUser.setPassword(encodedNewPassword);
            repository.save(updateUser);
            return true;
        }
        return false;
    }


}
