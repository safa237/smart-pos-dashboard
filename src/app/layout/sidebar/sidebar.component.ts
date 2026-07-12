import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();
  
  activeItem = 'Orders';

  menuItems = [
  {
    title: 'Products',
    icon: 'fa-solid fa-box-open',
    route: '/products'
  },
  {
    title: 'Orders',
    icon: 'fa-solid fa-receipt',
    route: '/orders'
  },
  {
    title: 'Kitchen',
    icon: 'fa-solid fa-kitchen-set',
    route: '/kitchen'
  }
];
  close() {
    this.closeSidebar.emit();
  }

  setActive(title: string) {
    this.activeItem = title;
    this.closeSidebar.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (window.innerWidth <= 991) {
      const sidebar = document.querySelector('.sidebar');
      const target = event.target as HTMLElement;
      const shouldIgnore = target.closest('.menu-btn, .sidebar-overlay, .close-btn');

      if (sidebar && !sidebar.contains(target) && !shouldIgnore) {
        this.close();
      }
    }
  }
}