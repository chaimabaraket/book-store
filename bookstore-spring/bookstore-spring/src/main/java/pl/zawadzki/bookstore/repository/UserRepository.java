package pl.zawadzki.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.zawadzki.bookstore.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getByUsername(String username);
    Optional<User> getByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
