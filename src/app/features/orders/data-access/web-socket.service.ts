import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private eventSubject = new Subject<void>();

  event$ = this.eventSubject.asObservable();

  start() {

    interval(5000).subscribe(() => {

      this.eventSubject.next();

    });

  }

}