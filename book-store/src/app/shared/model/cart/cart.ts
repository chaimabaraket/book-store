import {CartItem} from "../cartItem/cart-item";

export interface Cart {
  cartId: number;
  cartItems: CartItem[];
}
