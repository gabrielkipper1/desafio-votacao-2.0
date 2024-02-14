import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimerComponent } from './session-timer.component';
import { Session } from '../../interfaces/session';

describe('SessionTimerComponent', () => {
  let component: SessionTimerComponent;
  let fixture: ComponentFixture<SessionTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTimerComponent]
    })
      .compileComponents();

    const session: Session = {
      end_date: new Date(),
      start_date: new Date(),
    }

    fixture = TestBed.createComponent(SessionTimerComponent);
    component = fixture.componentInstance;
    component.session = session;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
