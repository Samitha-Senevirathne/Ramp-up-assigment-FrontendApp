import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket?: Socket;
  private connected = false;

  connect(userId: string) {
    if (!this.connected) {
      this.socket = io('http://localhost:3000', { query: { userId } });  //connect
      this.connected = true;
      console.log(`Connected as ${userId}`);
    }
  }

  onNotification(): Observable<any> {
    return new Observable((observer) => {
      if (!this.socket) return; //no connection yet
      this.socket.on('notification', (msg) => observer.next(msg)); //listen for notifications
    });
  }
}
