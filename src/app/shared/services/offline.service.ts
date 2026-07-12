import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PendingAction {
  type: 'update-price';
  productId: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private queueSubject = new BehaviorSubject<PendingAction[]>([]);

  queue$ = this.queueSubject.asObservable();
  online$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    window.addEventListener('online', () => {
      this.online$.next(true);
    });

    window.addEventListener('offline', () => {
      this.online$.next(false);
    });
  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  add(action: PendingAction): void {
    const queue = [...this.queueSubject.value];
    const index = queue.findIndex((item) => item.productId === action.productId);

    if (index > -1) {
      queue[index] = action;
    } else {
      queue.push(action);
    }

    this.queueSubject.next(queue);
  }

  remove(productId: number): void {
    const queue = this.queueSubject.value.filter((item) => item.productId !== productId);
    this.queueSubject.next(queue);
  }

  getQueue(): PendingAction[] {
    return this.queueSubject.value;
  }

  clear(): void {
    this.queueSubject.next([]);
  }
}