package pl.zawadzki.bookstore.service;

import pl.zawadzki.bookstore.dto.CartItemDto;
import pl.zawadzki.bookstore.model.Cart;

/**
 * Provides methods for Cart management.
 */
public interface CartService {
    /**
     * Add {@link pl.zawadzki.bookstore.model.CartItem} to {@link Cart}.
     * Creates CartItem object from {@link CartItemDto}
     *
     * @param cartItemDto {@link CartItemDto}
     */
    void addToCart(CartItemDto cartItemDto);

    /**
     * Returns user's {@link Cart}
     *
     * @return {@link Cart}
     */
    Cart getCart();

    /**
     * Removes {@link pl.zawadzki.bookstore.model.CartItem} from {@link Cart}.
     *
     * @param cartItemDto
     */
    void removeFromCart(CartItemDto cartItemDto);

    /**
     * Creates {@link pl.zawadzki.bookstore.model.Order} for current {@link pl.zawadzki.bookstore.model.User} from User's current Cart status.
     */
    void checkout();
}
