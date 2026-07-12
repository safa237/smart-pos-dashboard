import {
  OrderChannel,
  OrderPriority,
  OrderStatus,
} from './order.enums';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;

  customerName: string;

  channel: OrderChannel;

  status: OrderStatus;

  priority: OrderPriority;

  totalPrice: number;

  estimatedTime: number;

  createdAt: string;

  items: OrderItem[];
}

export interface Order {

  id: number;

  customerName: string;

  channel: OrderChannel;

  status: OrderStatus;

  priority: OrderPriority;

  estimatedTime: number;

  delayed: boolean;

  total: number;

}