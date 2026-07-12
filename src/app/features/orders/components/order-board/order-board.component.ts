import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderStatus } from '../../models/order.enums';
import { OrderColumnComponent } from '../order-column/order-column.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-board',
  standalone: true,
  imports: [OrderColumnComponent],
  templateUrl: './order-board.component.html',
  styleUrls: ['./order-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OrderBoardComponent implements OnChanges {

  @Input({ required: true })
  orders: Order[] = [];

  readonly OrderStatus = OrderStatus;

  receivedOrders: Order[] = [];
  preparingOrders: Order[] = [];
  readyOrders: Order[] = [];
  deliveredOrders: Order[] = [];
  completedOrders: Order[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.groupOrders();
    }
  }

  private groupOrders(): void {
    this.receivedOrders = this.orders.filter(
      o => o.status === OrderStatus.RECEIVED
    );

    this.preparingOrders = this.orders.filter(
      o => o.status === OrderStatus.PREPARING
    );

    this.readyOrders = this.orders.filter(
      o => o.status === OrderStatus.READY
    );

    this.deliveredOrders = this.orders.filter(
      o => o.status === OrderStatus.DELIVERED
    );

    this.completedOrders = this.orders.filter(
      o => o.status === OrderStatus.COMPLETED
    );
  }

}