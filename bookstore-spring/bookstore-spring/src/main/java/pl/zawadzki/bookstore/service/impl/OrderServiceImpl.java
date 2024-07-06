package pl.zawadzki.bookstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.zawadzki.bookstore.exception.OrderException;
import pl.zawadzki.bookstore.model.Order;
import pl.zawadzki.bookstore.repository.OrderRepository;
import pl.zawadzki.bookstore.service.CurrentUserService;
import pl.zawadzki.bookstore.service.OrderService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CurrentUserService currentUserService;

    /**
     * Returns List of all existing Orders.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Order}
     */
    public List<Order> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orderPage = orderRepository.findAll(pageable);
        List<Order> orders = orderPage.getContent();
        return orders;
    }

    /**
     * Returns {@link Order} with specified Id number.
     *
     * @param id {@link Long}
     * @return {@link Order}
     */
    public Order getById(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new OrderException("Order was not found...");
        }
        return optionalOrder.get();
    }

    /**
     * Returns List of all existing {@link pl.zawadzki.bookstore.model.User} Orders.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Order}
     */
    public List<Order> getAllByUsername(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderRepository
                .findAllByBuyerUsernameOrderByIsFinishedAscCreatedAtDesc(currentUserService.getCurrentUser().getUsername(), pageable);
        return orders.getContent();
    }

    public List<Order> getAllByEmail(String email, Pageable pageable) {
        return orderRepository.findAllByBuyerEmailOrderByIsFinishedAscCreatedAtDesc(email, pageable).getContent();
    }

    public List<Order> getAllByStatus(boolean isFinished, Pageable pageable) {
        return orderRepository.findAllByIsFinishedOrderByCreatedAtDesc(isFinished, pageable).getContent();
    }


}
