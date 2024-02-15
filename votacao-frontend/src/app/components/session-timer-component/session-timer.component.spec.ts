import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimerComponent } from './session-timer.component';
import { Session } from '../../interfaces/session';

describe('SessionTimerComponent', () => {
  let component: SessionTimerComponent;
  let fixture: ComponentFixture<SessionTimerComponent>;
  const validSession: Session = { start_date: new Date(Date.now() - 60000), end_date: new Date(Date.now() + 60000) };
  const expiredSession: Session = { start_date: new Date(Date.now() - 120000), end_date: new Date(Date.now() - 60000) };

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

  it("should have a header title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header')).toBeTruthy();
  })

  it("should have a timer if session is valid", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.session = validSession;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.out-of-time')).toBeFalsy();
    expect(compiled.querySelector('.remaining-time')).toBeTruthy();
  });

  it("should have the correct timer output if session is expired", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.session = expiredSession;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.out-of-time')).toBeTruthy();
    expect(compiled.querySelector('.remaining-time')).toBeFalsy();
  })

  it("should have start and end dates if session in not undefined", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.session = validSession;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.start-time')).toBeTruthy();
    expect(compiled.querySelector('.end-time')).toBeTruthy();
  }),

    it("should not have start and end dates if session is undefined", () => {
      const compiled = fixture.nativeElement;
      fixture.componentInstance.session = undefined;
      fixture.detectChanges();
      expect(compiled.querySelector('.times')).toBeFalsy();
    })
});
