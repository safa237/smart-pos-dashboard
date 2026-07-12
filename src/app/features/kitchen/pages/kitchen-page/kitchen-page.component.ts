import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { KitchenStatus } from '../../models/kitchen.model';
import { AsyncPipe } from '@angular/common';
import { KitchenService } from '../../data-access/kitchen.service';

@Component({
  selector: 'app-kitchen-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './kitchen-page.component.html',
  styleUrls: ['./kitchen-page.component.scss']
})
export class KitchenPageComponent {

  kitchenStatus$!: Observable<KitchenStatus>;

  constructor(private kitchenService: KitchenService) {
    this.kitchenStatus$ = this.kitchenService.kitchenStatus$;
  }

  // Helper methods for workload styling
  getWorkloadClass(workload: number): string {
    if (workload < 50) return 'low';
    if (workload < 80) return 'medium';
    return 'high';
  }

  getStatusText(workload: number): string {
    if (workload < 50) return 'Running smoothly';
    if (workload < 80) return 'Moderate load';
    return 'High load - Action needed';
  }

  getStatusIcon(workload: number): string {
    if (workload < 50) return 'fa-check-circle';
    if (workload < 80) return 'fa-exclamation-circle';
    return 'fa-times-circle';
  }

  getTrendClass(time: number): string {
    if (time < 20) return 'good';
    if (time < 30) return 'average';
    return 'slow';
  }

  getTrendText(time: number): string {
    if (time < 20) return 'Excellent';
    if (time < 30) return 'Average';
    return 'Slow';
  }

  getTrendIcon(time: number): string {
    if (time < 20) return 'fa-arrow-up';
    if (time < 30) return 'fa-minus';
    return 'fa-arrow-down';
  }
}