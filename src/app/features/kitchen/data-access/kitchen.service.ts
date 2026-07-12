import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { KitchenStatus } from '../models/kitchen.model';
import { KitchenLoad } from '../models/kitchen.enum';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  private loads = [
    KitchenLoad.LOW,
    KitchenLoad.MEDIUM,
    KitchenLoad.HIGH
  ];

  private index = 0;

  private simulationSub?: Subscription;

  private kitchenSubject = new BehaviorSubject<KitchenStatus>({
    load: KitchenLoad.LOW,
    workload: 30,
    preparingOrders: 4,
    readyOrders: 2,
    delayedOrders: 0,
    averagePrepTime: 12,
  });

  kitchenStatus$ = this.kitchenSubject.asObservable();

  constructor() {
    this.startSimulation();
  }

  startSimulation() {

    if (this.simulationSub) return;

    this.simulationSub = interval(10000).subscribe(() => {

      this.index = (this.index + 1) % this.loads.length;

      this.updateLoad(this.loads[this.index]);

    });

  }

  stopSimulation() {

    this.simulationSub?.unsubscribe();

    this.simulationSub = undefined;

  }

  updateLoad(load: KitchenLoad) {

    let status: KitchenStatus;

    switch (load) {

      case KitchenLoad.LOW:

        status = {
          load,
          workload: 30,
          preparingOrders: 4,
          readyOrders: 2,
          delayedOrders: 0,
          averagePrepTime: 12,
        };

        break;

      case KitchenLoad.MEDIUM:

        status = {
          load,
          workload: 65,
          preparingOrders: 8,
          readyOrders: 3,
          delayedOrders: 2,
          averagePrepTime: 18,
        };

        break;

      default:

        status = {
          load,
          workload: 92,
          preparingOrders: 14,
          readyOrders: 1,
          delayedOrders: 6,
          averagePrepTime: 28,
        };

    }

    this.kitchenSubject.next(status);

  }

  getCurrentStatus() {

  return this.kitchenSubject.value;

}

}