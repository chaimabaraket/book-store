package pl.zawadzki.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.zawadzki.bookstore.model.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
