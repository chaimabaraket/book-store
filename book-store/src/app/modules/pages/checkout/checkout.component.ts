import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/model/user/user";
import {UserService} from "../../../core/service/user-service/user.service";
import {CartItem} from "../../../shared/model/cartItem/cart-item";
import {CartService} from "../../../core/service/cart-service/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: User;
  cart$: Array<CartItem> = [];
  fullPrice: number = 0;


  constructor(private userService: UserService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    })
    this.cartService.getCartItems().subscribe(cart => {
      this.cart$ = cart.cartItems;
      this.calculatePrice();
    });

  }

  private calculatePrice() {
    this.cart$.forEach((value) => {
      this.fullPrice += value.quantity * value.price;
    })
  }

  checkout() {
    this.cartService.checkout().subscribe(data => {
      },
      error => {
        console.log(error);
      });
  }

}
