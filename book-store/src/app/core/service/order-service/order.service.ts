import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Order } from "../../../shared/model/order/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  getOrders(page: number, size: number): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: this.localStorage.retrieve('token')
      })
    };
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.httpClient.get('http://localhost:8089/api/order/myOrders', {
      params: params,
      headers: httpHeaders.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  getOrder(orderId: number): Observable<Order> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: this.localStorage.retrieve('token')
      })
    };
    return this.httpClient.get<Order>(`http://localhost:8089/api/order/byId/${orderId}`, {
      headers: httpHeaders.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      console.error("Forbidden error occurred:", error);
      // Handle unauthorized access (e.g., redirect to login)
    } else {
      console.error("An error occurred:", error);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
