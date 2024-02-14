import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteScreenComponent } from './vote-screen.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('VoteScreenComponent', () => {
  let component: VoteScreenComponent;
  let fixture: ComponentFixture<VoteScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VoteScreenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VoteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
