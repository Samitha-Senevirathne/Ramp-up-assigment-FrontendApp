import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-vehicle-export-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './vehicle-export.component.html',
  styleUrls: ['./vehicle-export.component.scss']
})
export class VehicleExportComponent {
  minAge?: number;
  notifications: string[] = []; //to store the notification msgs come from the server

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<VehicleExportComponent>,
    private notificationService: NotificationService
  ) {
    //Subscribe to WebSocket notifications
    this.notificationService.onNotification().subscribe((data) => {
      console.log('Notification received:', data);
      this.notifications.unshift(`${data.timestamp}: ${data.message}`);
      if (this.notifications.length > 10) this.notifications.pop(); //keep last 10
    });
  }

  exportVehicles() {

    this.dialogRef.close(); 
  const userId = localStorage.getItem('userId') || 'guest';
  
  this.http.post('http://localhost:3000/export/vehicles', {    //send to the backend server
    minAge: this.minAge,
    userId: localStorage.getItem('userId'),
  }).subscribe({
    next: () => {
      alert(`Export job queued: ${userId}. You get a notification when done.`);
    
    },
    error: (err) => {
      console.error(err);
      alert('Error queueing export.');
    },
  });
  }

   close() {
    this.dialogRef.close();
  }
}
