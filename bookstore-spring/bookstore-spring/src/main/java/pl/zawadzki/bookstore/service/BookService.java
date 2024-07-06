package pl.zawadzki.bookstore.service;

import org.springframework.http.ResponseEntity;
import pl.zawadzki.bookstore.model.Book;

import java.util.List;

/**
 * Provides methods for Book management.
 */
public interface BookService {
    /**
     * Allows to create and save new {@link Book} to database.
     *
     * @param book {@link Book}
     * @return {@link ResponseEntity} with {@link String}
     */
    ResponseEntity<String> addBook(Book book);

    /**
     * Returns List of all existing books.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Book}
     */
    List<Book> getAll(int page, int size);

    /**
     * Returns List of {@link pl.zawadzki.bookstore.model.Author} books.
     *
     * @param name {@link String} Author's name
     * @return {@link List} of {@link Book}
     */
    List<Book> getAllByAuthor(String name);

    /**
     * Returns {@link pl.zawadzki.bookstore.model.Book} with specified title.
     *
     * @param title {@link String} Book title
     * @return {@link Book}
     */
    Book getByTitle(String title);

    /**
     * Decreases book stock.
     *
     * @param bookId {@link Long} Book id
     * @param amount {@link Integer} amount to decrease
     */
    void decreaseStock(Long bookId, Integer amount);
}
