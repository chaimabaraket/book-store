package pl.zawadzki.bookstore.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.zawadzki.bookstore.exception.OrderException;
import pl.zawadzki.bookstore.model.Order;
import pl.zawadzki.bookstore.service.OrderService;

@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Order>> getAllOrders(@RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAll(page - 1, size));
    }

    @GetMapping("/myOrders")
    public ResponseEntity<Iterable<Order>> getUserOrders(@RequestParam(defaultValue = "1") int page,
                                                         @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllByUsername(page - 1, size));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getById(id));
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity catchOrderException(OrderException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Info",ex.getMessage()).build();
    }
}
