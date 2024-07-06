package pl.zawadzki.bookstore.service;

import pl.zawadzki.bookstore.dto.LoginRequest;
import pl.zawadzki.bookstore.dto.LoginResponse;

public interface LoginService {
    /**
     * Authenticates {@link pl.zawadzki.bookstore.model.User} with {@link LoginRequest}
     *
     * @param loginRequest {@link LoginRequest}
     * @return {@link LoginResponse}
     */
    LoginResponse login(LoginRequest loginRequest);
}
