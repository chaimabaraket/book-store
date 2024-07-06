package pl.zawadzki.bookstore.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.zawadzki.bookstore.dto.RegisterRequest;
import pl.zawadzki.bookstore.model.User;
import pl.zawadzki.bookstore.repository.CartRepository;
import pl.zawadzki.bookstore.repository.UserRepository;
import pl.zawadzki.bookstore.service.impl.RegisterServiceImpl;

@ExtendWith(MockitoExtension.class)
class RegisterServiceTest {

    @Mock
    private UserRepository repository;
    @Mock
    private CartRepository cartRepository;
    @Mock
    private PasswordEncoder encoder;


    @InjectMocks
    private RegisterServiceImpl service;

    @Test
    public void shouldRegisterUser() {
        final User user =
                User.builder()
                        .username("testUser")
                        .password(null)
                        .email("testMail@qwe.com")
                        .isActive(true)
                        .role("ROLE_USER")
                        .build();
        service.signUp(new RegisterRequest(user.getEmail(),user.getUsername(),user.getPassword()));
        Mockito.verify(repository,Mockito.times(1)).save(user);
    }

}