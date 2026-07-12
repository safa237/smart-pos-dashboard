import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Order } from '../../models/order.model';
import { OrderBoardComponent } from '../../components/order-board/order-board.component';
import { OrderService } from '../../data-access/order.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderBoardComponent, AsyncPipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {

  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.orderService.loadOrders();

    this.orders$ = this.orderService.orders$;

  }

}