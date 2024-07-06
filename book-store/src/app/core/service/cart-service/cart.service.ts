import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";
import { CartDTO } from "./cartDTO";
import { CartItem } from "../../../shared/model/cartItem/cart-item";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localStorage.retrieve('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addToCart(cartDTO: CartDTO): Observable<CartDTO> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post<CartDTO>("http://localhost:8089/api/cart/add", cartDTO, { headers }).pipe(
      tap(() => this.updateCartQuantity())
    );
  }

  getCartItems(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get('http://localhost:8089/api/cart', { headers }).pipe(
      tap(cart => this.saveCartQuantity(cart.cartItems))
    );
  }

  removeItem(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`http://localhost:8089/api/cart/remove/${id}`, { headers }).pipe(
      tap(() => this.updateCartQuantity())
    );
  }

  checkout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get('http://localhost:8089/api/cart/checkout', { headers }).pipe(
      tap(() => this.localStorage.clear('cartQuantity'))
    );
  }

  private updateCartQuantity() {
    this.getCartItems().subscribe(); // Triggers the saveCartQuantity method
  }

  private saveCartQuantity(cartItems: CartItem[]) {
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    this.localStorage.store('cartQuantity', quantity);
  }
}
