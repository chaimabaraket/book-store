package pl.zawadzki.bookstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.zawadzki.bookstore.exception.AuthorNotFoundException;
import pl.zawadzki.bookstore.exception.BookNotFoundException;
import pl.zawadzki.bookstore.model.Author;
import pl.zawadzki.bookstore.model.Book;
import pl.zawadzki.bookstore.repository.AuthorRepository;
import pl.zawadzki.bookstore.repository.BookRepository;
import pl.zawadzki.bookstore.service.BookService;

import java.util.List;
import java.util.Optional;

/**
 * Provides methods for Book management.
 */
@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    /**
     * Allows to create and save new {@link Book} to database.
     *
     * @param book {@link Book}
     * @return String with information is book created or not.
     */
    @Transactional
    public ResponseEntity<String> addBook(Book book) {
        Optional<Book> optionalBook = bookRepository.findByTitleIgnoreCase(book.getTitle());
        if (optionalBook.isPresent()) {
            return new ResponseEntity<>("Book already exists.", HttpStatus.CONFLICT);
        }
        bookRepository.save(book);
        return new ResponseEntity<>("Book has been created", HttpStatus.OK);
    }

    /**
     * Returns List of all existing books.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Book}
     */
    @Transactional(readOnly = true)
    public List<Book> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> bookPage = bookRepository.findAll(pageable);
        List<Book> books = bookPage.getContent();
        return books;
    }

    /**
     * Returns List of {@link pl.zawadzki.bookstore.model.Author} books.
     *
     * @param name {@link String} Author's name
     * @return {@link List} of {@link Book}
     */
    @Transactional(readOnly = true)
    public List<Book> getAllByAuthor(String name) {
        Author author = authorRepository.getByName(name)
                .orElseThrow(() -> new AuthorNotFoundException("Author " + name + " does not exist."));
        return bookRepository.getAllByAuthor(author);
    }

    /**
     * Returns {@link pl.zawadzki.bookstore.model.Book} with specified title.
     *
     * @param title {@link String} Book title
     * @return {@link Book}
     */
    @Transactional(readOnly = true)
    public Book getByTitle(String title) {
        return bookRepository.getBookByTitle(title)
                .orElseThrow(() -> new BookNotFoundException("Book " + title + " does not exist."));
    }

    /**
     * Decreases book stock.
     *
     * @param bookId {@link Long} Book id
     * @param amount {@link Integer} amount to decrease
     */
    @Transactional
    public void decreaseStock(Long bookId, Integer amount) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book " + bookId + " does not exist."));
        int amountAfter = book.getBookStock() - amount;
        if (amountAfter < 0) {
            throw new BookNotFoundException("Not enough books in stock");
        }
        book.setBookStock(amountAfter);
        bookRepository.save(book);
    }


}
