package pl.zawadzki.bookstore.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.zawadzki.bookstore.model.User;
import pl.zawadzki.bookstore.repository.UserRepository;
import pl.zawadzki.bookstore.service.impl.UserServiceImpl;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserServiceImpl service;

    @Test
    void shouldSaveUserSuccessfully() {
        //given
        final User user =
                User.builder()
                        .userId(null)
                        .username("testUser")
                        .password("12345")
                        .email("testMail@qwe.com")
                        .build();

        given(repository.getByUsername(user.getUsername())).willReturn(Optional.empty());
        given(repository.save(user)).willAnswer(invocationOnMock -> invocationOnMock.getArgument(0));

        //when

        //then
        verify(repository).save(any(User.class));
    }
}