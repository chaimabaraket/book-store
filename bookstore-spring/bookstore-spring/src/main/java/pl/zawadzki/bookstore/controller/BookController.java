package pl.zawadzki.bookstore.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.zawadzki.bookstore.exception.AuthorNotFoundException;
import pl.zawadzki.bookstore.exception.BookNotFoundException;
import pl.zawadzki.bookstore.model.Book;
import pl.zawadzki.bookstore.service.BookService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class BookController {
    private final BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Book>> getAllBooks(@RequestParam(defaultValue = "1") int page,
                                                      @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAll(page - 1, size));
    }

    @GetMapping("/byAuthor/{author}")
    public ResponseEntity<List<Book>> getAllByAuthor(@PathVariable String author) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllByAuthor(author));
    }

    @GetMapping("/byTitle/{title}")
    public ResponseEntity<Book> getByTitle(@PathVariable String title) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getByTitle(title));
    }

    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> addBook(@Valid @RequestBody Book book) {
        return bookService.addBook(book);
    }


    //Exceptions
    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity catchAuthorException(AuthorNotFoundException e) {
        return ResponseEntity.badRequest().header("Info ", e.getMessage()).build();
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity catchBookException(BookNotFoundException e) {
        return ResponseEntity.badRequest().header("Info ", e.getMessage()).build();
    }

}
