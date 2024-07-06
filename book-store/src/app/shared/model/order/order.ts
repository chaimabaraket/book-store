import {CartItem} from "../cartItem/cart-item";

export interface Order {
  orderId: number;
  createdAt: string;
  cartItems: CartItem[];
  finalPrice: number;
  buyerUsername: string,
  buyerEmail: string,
  buyerPhone: string,
  buyerAddress: string,
  finished: boolean;
}
