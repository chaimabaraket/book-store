package pl.zawadzki.bookstore.service;

import org.springframework.data.domain.Pageable;
import pl.zawadzki.bookstore.model.Order;

import java.util.List;

public interface OrderService {
    /**
     * Returns List of all existing Orders.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Order}
     */
    List<Order> getAll(int page, int size);

    /**
     * Returns List of all existing {@link pl.zawadzki.bookstore.model.User} Orders.
     *
     * @param page {@link Integer} number of page
     * @param size {@link Integer} elements on one page
     * @return {@link List} of {@link Order}
     */
    List<Order> getAllByUsername(int page, int size);

    List<Order> getAllByEmail(String email, Pageable pageable);

    List<Order> getAllByStatus(boolean isFinished, Pageable pageable);

    /**
     * Returns {@link Order} with specified Id number.
     *
     * @param id {@link Long}
     * @return {@link Order}
     */
    Order getById(Long id);

}
