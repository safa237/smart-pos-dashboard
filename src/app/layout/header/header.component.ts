import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  isNotificationOpen = false;
  
  notifications = [
    {
      id: 1,
      title: 'New Order #1234',
      message: 'Customer ordered 3 items',
      time: '5 min ago',
      isRead: false
    },
    {
      id: 2,
      title: 'New Customer',
      message: 'Sarah Johnson registered',
      time: '15 min ago',
      isRead: false
    },
    {
      id: 3,
      title: 'Delivery Updated',
      message: 'Order #1232 is out for delivery',
      time: '1 hour ago',
      isRead: true
    },
    {
      id: 4,
      title: 'New Review',
      message: '★★★★★ from Michael Chen',
      time: '2 hours ago',
      isRead: true
    }
  ];

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
    if (this.isNotificationOpen) {
      this.notifications.forEach(n => n.isRead = true);
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  // Close dropdown when clicking outside
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isNotificationOpen && !target.closest('.notification-wrapper')) {
      this.isNotificationOpen = false;
    }
  }
}