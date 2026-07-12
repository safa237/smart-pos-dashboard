import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../orders/models/order.model';
import { AiState } from '../models/ai.enum';
import { AiRecommendation } from '../models/ai.model';
import { KitchenService } from '../../kitchen/data-access/kitchen.service';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {

  constructor(private kitchenService: KitchenService) {}

  getRecommendation(order: Order): Observable<AiRecommendation> {

    return new Observable(observer => {

      observer.next({
        state: AiState.LOADING,
        message: 'Analyzing order...'
      });

      setTimeout(() => {

        observer.next({
          state: AiState.STREAMING,
          message: 'Checking kitchen workload...'
        });

      }, 1000);

      setTimeout(() => {

        const random = Math.random();

        if (random < 0.2) {

          observer.next({
            state: AiState.ERROR,
            message: 'Failed to analyze order.'
          });

          observer.complete();

          return;
        }

        observer.next({
          state: AiState.SUCCESS,
          message: this.generateRecommendation(order)
        });

        observer.complete();

      }, 2500);

    });

  }

  private generateRecommendation(order: Order): string {

    const kitchen = this.kitchenService.getCurrentStatus();

    if (kitchen.load === 'High') {

      return 'Kitchen overloaded. Delay expected.';

    }

    const messages = [

      'Offer Combo Meal',

      'Suggest adding a soft drink',

      'Verify delivery address',

      'Customer may have allergy',

      'Priority handling recommended'

    ];

    return messages[Math.floor(Math.random() * messages.length)];

  }

}