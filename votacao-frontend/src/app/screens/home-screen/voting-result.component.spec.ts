import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingResultComponent } from './voting-result.component';

describe('TopicResultComponent', () => {
  let component: VotingResultComponent;
  let fixture: ComponentFixture<VotingResultComponent>;

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
});
