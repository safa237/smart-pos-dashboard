import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderService } from '../data-access/order.service';
import { KitchenService } from '../../kitchen/data-access/kitchen.service';
import { OrderStatus } from '../models/order.enums';

@Injectable({
  providedIn: 'root'
})
export class OrderSimulationService {

  constructor(
    private orderService: OrderService,
    private kitchenService: KitchenService
  ) {}

  startSimulation(): void {

    interval(6000).subscribe(() => {

      this.simulateOrderUpdate();

    });

  }

  private simulateOrderUpdate(): void {

    const orders = this.orderService.getCurrentOrders();

    if (!orders.length) return;

    const activeOrders = orders.filter(
      order => order.status !== OrderStatus.COMPLETED
    );

    if (!activeOrders.length) return;

    const randomOrder =
      activeOrders[Math.floor(Math.random() * activeOrders.length)];

    const updatedOrder = this.nextStatus(randomOrder);

    this.orderService.updateOrder(updatedOrder);

  }

  private nextStatus(order: Order): Order {

    const updated = { ...order };

    switch (updated.status) {

      case OrderStatus.RECEIVED:
        updated.status = OrderStatus.PREPARING;
        break;

      case OrderStatus.PREPARING:
        updated.status = OrderStatus.READY;
        break;

      case OrderStatus.READY:
        updated.status = OrderStatus.DELIVERED;
        break;

      case OrderStatus.DELIVERED:
        updated.status = OrderStatus.COMPLETED;
        break;
    }

    return updated;

  }

}