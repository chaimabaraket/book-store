package pl.zawadzki.bookstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.zawadzki.bookstore.dto.CartItemDto;
import pl.zawadzki.bookstore.exception.BookNotFoundException;
import pl.zawadzki.bookstore.service.CartService;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
@CrossOrigin
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity showCart() {
        if (cartService.getCart() == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(cartService.getCart());
    }

    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public ResponseEntity addToCart(@RequestBody CartItemDto cartItemDto) {
        cartService.addToCart(cartItemDto);
        return ResponseEntity.status(HttpStatus.OK).header("Info", "Book added to cart").build();
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity removeFromCart(@PathVariable long id) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setBookId(id);
        cartService.removeFromCart(cartItemDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/checkout")
    public ResponseEntity checkout() {
        cartService.checkout();
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity catchBookException(BookNotFoundException e) {
        return ResponseEntity.badRequest().header("Info ", e.getMessage()).build();
    }

}
