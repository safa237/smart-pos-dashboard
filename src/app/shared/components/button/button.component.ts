import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() text = '';

  @Input() icon = '';

  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary';

  @Input() loading = false;

  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();

  onClick() {

    if (!this.loading && !this.disabled) {
      this.clicked.emit();
    }

  }

}