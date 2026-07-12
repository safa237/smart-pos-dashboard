import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AiRecommendation } from '../../models/ai.model';
import { Order } from '../../../orders/models/order.model';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {

  @Input() isOpen = false;

  @Input() order!: Order;

  @Input() ai?: AiRecommendation;

  @Output() close = new EventEmitter<void>();

  @Output() retry = new EventEmitter<void>();

}