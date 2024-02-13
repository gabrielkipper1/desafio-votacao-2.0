import { Component, Input } from '@angular/core';
import { Session } from '../interfaces/session';
import { Subscription, interval, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RemainingTimePipe } from '../pipes/remaining-time-pipe/remaining-time.pipe'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-session-timer',
  standalone: true,
  imports: [RemainingTimePipe, CommonModule, MatCardModule],
  templateUrl: './session-timer.component.html',
  styleUrl: './session-timer.component.scss'
})
export class SessionTimerComponent {
  private timerSubscription!: Subscription;
  @Input() session!: Session;
  remainingTime!: number;

  ngOnInit(): void {
    if (this.session === undefined) {
      this.remainingTime = 0;
      return;
    }

    this.calculateRemainingTime();
    this.timerSubscription = interval(1000)
      .pipe(
        map(() => this.calculateRemainingTime())
      )
      .subscribe(() => {
        // this.setRemainingTimeColor();
      });
  }

  isOpen(): boolean {
    return this.remainingTime > 0;
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  calculateRemainingTime(): void {
    const now = new Date().getTime();
    const endTime = new Date(this.session.end_date).getTime();
    this.remainingTime = Math.max(0, endTime - now) / 1000;
  }
}
