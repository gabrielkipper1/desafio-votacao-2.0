import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteResultLineComponent } from './vote-result-line.component';

describe('VoteResultLineComponent', () => {
  let component: VoteResultLineComponent;
  let fixture: ComponentFixture<VoteResultLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteResultLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteResultLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
