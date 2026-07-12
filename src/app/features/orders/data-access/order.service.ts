import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { BehaviorSubject } from 'rxjs';
import { OrderStatus } from '../models/order.enums';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private api = 'http://localhost:3000/orders';

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }
  loadOrders() {

  this.http.get<Order[]>(this.api).subscribe(orders => {

    this.ordersSubject.next(orders);

  });

}

getCurrentOrders() {
  return this.ordersSubject.value;
}

updateOrder(updatedOrder: Order): void {

  const updatedOrders = this.ordersSubject.value.map(order =>
    order.id === updatedOrder.id ? updatedOrder : order
  );

  this.ordersSubject.next(updatedOrders);

}
}