package pl.zawadzki.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.zawadzki.bookstore.model.Cart;
import pl.zawadzki.bookstore.model.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart getByUser(User user);
}
