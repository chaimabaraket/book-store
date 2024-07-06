package pl.zawadzki.bookstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.zawadzki.bookstore.model.User;
import pl.zawadzki.bookstore.repository.UserRepository;
import pl.zawadzki.bookstore.service.CurrentUserService;

@Service
@AllArgsConstructor
public class CurrentUserServiceImpl implements CurrentUserService {

    private final UserRepository userRepository;

    /**
     * Returns current logged {@link User}
     *
     * @return {@link User}
     * @throws org.springframework.security.core.userdetails.UsernameNotFoundException
     */
    @Transactional(readOnly = true)
    public User getCurrentUser() {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User)
                        SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userRepository.getByUsername(principal.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User " + principal.getUsername() + " not found"));
    }
}
