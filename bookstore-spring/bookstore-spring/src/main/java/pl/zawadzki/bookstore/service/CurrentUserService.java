package pl.zawadzki.bookstore.service;

import pl.zawadzki.bookstore.model.User;

public interface CurrentUserService {
    /**
     * Returns current logged {@link User}
     *
     * @return {@link User}
     * @throws org.springframework.security.core.userdetails.UsernameNotFoundException
     */
    User getCurrentUser();
}
