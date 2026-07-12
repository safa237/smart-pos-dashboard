import { KitchenLoad } from './kitchen.enum';

export interface KitchenStatus {
  load: KitchenLoad;
  workload: number;
  preparingOrders: number;
  readyOrders: number;
  delayedOrders: number;
  averagePrepTime: number;
}