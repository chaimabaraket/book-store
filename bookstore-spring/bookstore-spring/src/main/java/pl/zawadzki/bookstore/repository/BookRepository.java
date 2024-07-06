package pl.zawadzki.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.zawadzki.bookstore.model.Author;
import pl.zawadzki.bookstore.model.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> getBookByTitle(String title);
    List<Book> getAllByAuthor(Author author);
    Book getBookByBookId(Long id);
    Optional<Book> findByTitleIgnoreCase(String title);
}
