import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from "../../../core/service/order-service/order.service";
import { Order } from "../../../shared/model/order/order";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$: Array<Order> = [];
  orderDetails!: Order;
  page: number = 1;
  size: number = 3;
  showInfo: boolean = false;
  private querySub!: Subscription;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(() => this.update());
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  update() {
    const currentPage = +(this.route.snapshot.queryParamMap.get('page') ?? 1);
    const size = +(this.route.snapshot.queryParamMap.get('size') ?? 3);
    this.getOrders(currentPage, size);
  }

  getOrders(page: number = 1, size: number = 3) {
    this.orderService.getOrders(page, size).subscribe(orders => {
      this.orders$ = orders;
      this.page = page;
    });
  }

  getDetails(orderId: number) {
    this.orderService.getOrder(orderId).subscribe(order => {
      this.orderDetails = order;
      this.showInfo = true;
    }, error => {
      console.log(error);
    });
  }

  close() {
    this.showInfo = false;
  }
}
