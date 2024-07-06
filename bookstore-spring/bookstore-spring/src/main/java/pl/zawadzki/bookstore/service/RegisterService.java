package pl.zawadzki.bookstore.service;

import org.springframework.http.ResponseEntity;
import pl.zawadzki.bookstore.dto.RegisterRequest;

public interface RegisterService {
    /**
     * Creates new {@link pl.zawadzki.bookstore.model.User} from passed {@link RegisterRequest}
     *
     * @param registerRequest {@link RegisterRequest}
     * @return {@link ResponseEntity} with {@link String}
     */
    ResponseEntity<String> signUp(RegisterRequest registerRequest);
}
