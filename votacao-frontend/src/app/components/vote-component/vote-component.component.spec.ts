import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponentComponent } from './vote-component.component';
import { Topic } from '../../interfaces/topic';

describe('VoteComponentComponent', () => {
  let component: VoteComponentComponent;
  let fixture: ComponentFixture<VoteComponentComponent>;
  let validSession: { end_date: Date, start_date: Date } = { end_date: new Date(Date.now() + 60000), start_date: new Date() }
  let expiredSession: { end_date: Date, start_date: Date } = { end_date: new Date(Date.now() - 60000), start_date: new Date(Date.now() - 6000000) }
  let validSessionTopic: Topic = { category: "test", description: "test", id: 1, sessions: [validSession] }
  let invalidSessionTopic: Topic = { category: "test", description: "test", id: 1, sessions: [expiredSession] }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a timer if has a valid session", () => {
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.timer')).toBeTruthy();
  });

  it("should have a timer if has an invalid session", () => {
    const compiled = fixture.nativeElement;
    component.topic = invalidSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.timer')).toBeTruthy();
  });

  it("should have two vote buttons if has a valid session", () => {
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.yes-button')).toBeTruthy();
    expect(compiled.querySelectorAll('.no-button')).toBeTruthy();
  });

  it("should not have two vote buttons if has an invalid session", () => {
    const compiled = fixture.nativeElement;
    component.topic = invalidSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.yes-button')).toBeFalsy();
    expect(compiled.querySelector('.no-button')).toBeFalsy();
  });

  it("should call confirm vote when YES button is clicked", () => {
    spyOn(component, 'confirmVote');
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.yes-button');
    button.click();
    expect(component.confirmVote).toHaveBeenCalledWith('Yes');
  });

  it("should call confirm vote with NO when NO button is clicked", () => {
    spyOn(component, 'confirmVote');
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.no-button');
    button.click();
    expect(component.confirmVote).toHaveBeenCalledWith('No');
  });

  it("should show session ended message when session is invalid", () => {
    const compiled = fixture.nativeElement;
    component.topic = invalidSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.session-ended')).toBeTruthy();
  });

  it("should not show session ended message when session is valid", () => {
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.session-ended')).toBeFalsy();
  });

  it("should show details button", () => {
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    expect(compiled.querySelector('.details-button')).toBeTruthy();
  });

  it("should call details button when pressed", () => {
    spyOn(component, 'goToTopicPage');
    const compiled = fixture.nativeElement;
    component.topic = validSessionTopic;
    component.ngOnInit();
    fixture.detectChanges();
    const button = compiled.querySelector('.details-button');
    button.click();
    expect(component.goToTopicPage).toHaveBeenCalled();
  });

});
