package pl.zawadzki.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.zawadzki.bookstore.model.CartItem;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> getCartItemByBookId(Long bookId);
}
