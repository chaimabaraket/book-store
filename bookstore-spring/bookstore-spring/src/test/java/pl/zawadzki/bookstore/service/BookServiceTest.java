package pl.zawadzki.bookstore.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.zawadzki.bookstore.exception.BookNotFoundException;
import pl.zawadzki.bookstore.model.Book;
import pl.zawadzki.bookstore.repository.AuthorRepository;
import pl.zawadzki.bookstore.repository.BookRepository;
import pl.zawadzki.bookstore.service.impl.BookServiceImpl;

import java.math.BigDecimal;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

    @Mock
    BookRepository bookRepository;
    @Mock
    AuthorRepository authorRepository;
    @InjectMocks
    BookServiceImpl bookService;


    @Test
    void shouldGetBookByTitle() {
        // Given
        Book book = new Book(111L, "TestBook", "TestDesc", new BigDecimal(10.99), 1, null, null);

        // When
        Mockito.when(bookRepository.getBookByTitle("TestBook")).thenReturn(Optional.of(book));
        Book response = bookService.getByTitle("TestBook");

        // Then
        Assertions.assertThat(response).isEqualTo(book);
    }

    @Test
    void shouldThrowExceptionWhenBookIsNotFound() {
        String title = "Not existing title";
        Assertions.assertThatThrownBy(() -> bookService.getByTitle(title))
                .isInstanceOf(BookNotFoundException.class).hasMessage("Book " + title + " does not exist.");
    }

}