package pl.zawadzki.bookstore.service;

import pl.zawadzki.bookstore.dto.PasswordDto;
import pl.zawadzki.bookstore.dto.UserDto;
import pl.zawadzki.bookstore.model.User;

public interface UserService {
    /**
     * Returns information about user
     *
     * @return {@link User}
     */
    User getUserInfo();

    /**
     * Updates {@link User} information.
     *
     * @param userDto {@link UserDto}
     */
    void updateUserInfo(UserDto userDto);

    /**
     * Updates {@link User} password.
     *
     * @param passwordDto {@link PasswordDto}
     * @return true if success false if not.
     */
    boolean changePassword(PasswordDto passwordDto);

}
