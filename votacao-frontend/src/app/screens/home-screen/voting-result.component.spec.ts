import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingResultComponent } from './voting-result.component';
import { of } from 'rxjs';
import { VotingResult } from '../../interfaces/voting-result';

describe('VotingResultComponent', () => {
  let component: VotingResultComponent;
  let fixture: ComponentFixture<VotingResultComponent>;
  const votingResults: VotingResult[] = [
    { option: "yes", votes: 1 },
    { option: "no", votes: 2 },
  ]

  const total: VotingResult = { option: "total", votes: 3 }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingResultComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VotingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a header title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header')).toBeTruthy();
  });

  it("should have a loading spinner if votes not loaded", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
  });

  it("should have a list of votes", () => {
    const compiled = fixture.nativeElement;
    component.votes$ = of(votingResults);
    component.calculateTotalVotes(votingResults);
    fixture.detectChanges();
    expect(compiled.querySelector('.result-line')).toBeTruthy();
  });

  it("should have the correct number of result items", () => {
    const compiled = fixture.nativeElement;
    component.votes$ = of(votingResults);
    component.calculateTotalVotes(votingResults);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.result-line').length).toBe(2);
  })

  it("should have the total of votes and the counter to be correct", () => {
    const compiled = fixture.nativeElement;
    component.votes$ = of(votingResults);
    component.calculateTotalVotes(votingResults);
    fixture.detectChanges();

    expect(compiled.querySelector('.result-total')).toBeTruthy();
    expect(component.total?.votes).toBe(3);
  });

  it("should have the winner text if session is finished. temporary winner must be hidden", () => {
    const compiled = fixture.nativeElement;
    component.topic = { category: "test", description: "test", id: 1, sessions: [{ end_date: new Date(Date.now() - 60000), start_date: new Date(Date.now() - 6000000) }] }
    component.votes$ = of(votingResults);
    component.calculateTotalVotes(votingResults);
    fixture.detectChanges();

    expect(compiled.querySelector('.winner')).toBeTruthy();
    expect(compiled.querySelector('.temp-winner')).toBeFalsy();
  })

  it("should have the temporary winner text if session is finished, winner must be hidden", () => {
    const compiled = fixture.nativeElement;
    component.topic = { category: "test", description: "test", id: 1, sessions: [{ end_date: new Date(Date.now() + 6000000), start_date: new Date(Date.now() - 6000000) }] }
    component.votes$ = of(votingResults);
    component.getWinner(votingResults);
    component.calculateTotalVotes(votingResults);
    component.setActiveSession();
    fixture.detectChanges();

    expect(compiled.querySelector('.temp-winner')).toBeTruthy();
    expect(compiled.querySelector('.winner')).toBeFalsy();
  })

  it("should have a  error message if there is an error", () => {
    const compiled = fixture.nativeElement;
    component.errorMessage = "test";
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message')).toBeTruthy();
  });
});
