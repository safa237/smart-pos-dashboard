import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { OrderSimulationService } from '../../features/orders/data-access/order-simulation.service';

@Component({
  selector: 'app-shell',
  imports: [DashboardLayoutComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  constructor(private simulation: OrderSimulationService) {}
  ngOnInit() {
    this.simulation.startSimulation();
  }
}
