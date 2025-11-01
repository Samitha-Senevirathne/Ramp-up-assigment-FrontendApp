

import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule ,RouterOutlet} from '@angular/router';
import { NotificationToastComponent } from './components/vehicle-tost/vehicle-tost.component';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    NotificationToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {

// userId = '';

//   ngOnInit() {
//     const saved = localStorage.getItem('userId');
//     if (saved) {
//       this.userId = saved;
//     } else {
//       this.userId = prompt('Enter your username or ID:') || 'guest';
//       localStorage.setItem('userId', this.userId);
//     }
//   }

// }

export class AppComponent implements OnInit {
  userId = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const saved = localStorage.getItem('userId');
    if (saved) {
      this.userId = saved;
    } else {
      this.userId = prompt('Enter your username or ID:') || 'guest';
      localStorage.setItem('userId', this.userId);
    }

    //connect only now
    this.notificationService.connect(this.userId);

    //listen for notifications
    this.notificationService.onNotification().subscribe((msg) => {
      console.log('Notification:', msg);
    });

  }


}
