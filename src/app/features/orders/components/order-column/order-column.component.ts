import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderCardComponent } from '../order-card/order-card.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-column',
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './order-column.component.html',
  styleUrls: ['./order-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderColumnComponent {
  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  orders: Order[] = [];

  @Input({ required: true })
  status!: string;
}