import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { AiAssistantService } from '../../../ai-assistant/data-access/ai.service';
import { AiRecommendation } from '../../../ai-assistant/models/ai.model';
import { AiAssistantComponent } from '../../../ai-assistant/components/ai-assistant/ai-assistant.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule, AiAssistantComponent],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  ai?: AiRecommendation;

  constructor(private aiService: AiAssistantService) {}

  ngOnInit(): void {
    this.loadRecommendation();
  }

  getPriorityBadgeClass(priority: string): string {
    const classes: Record<string, string> = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low',
    };

    return classes[priority.toLowerCase()] ?? 'priority-low';
  }

  getStatusBadgeClass(status: string): string {
    const classes: Record<string, string> = {
      received: 'status-received',
      preparing: 'status-preparing',
      ready: 'status-ready',
      delivered: 'status-delivered',
      completed: 'status-completed',
    };

    return classes[status.toLowerCase()] ?? 'status-received';
  }

  loadRecommendation() {

    this.aiService
        .getRecommendation(this.order)
        .subscribe(result => {

            this.ai = result;

        });

}

retry() {
    this.loadRecommendation();
}
showAi = false;

toggleAi() {
  this.showAi = !this.showAi;
}

openAi(){
   this.showAi=true;
}

closeAi(){
   this.showAi=false;
}
}