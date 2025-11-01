import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-tost.component.html',
  styleUrls: ['./vehicle-tost.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition(':enter', [
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  notifications: { id: number; message: string }[] = [];
  private nextId = 0;
  private sub: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.sub = this.notificationService.onNotification().subscribe((data) => {
      const id = this.nextId++;
      this.notifications.push({ id, message: data.message });

      setTimeout(() => {
        this.notifications = this.notifications.filter((n) => n.id !== id);
      }, 10000);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
