import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmVoteComponent } from './confirm-vote.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('ConfirmVoteComponent', () => {
  let component: ConfirmVoteComponent;
  let fixture: ComponentFixture<ConfirmVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { }
          }
        }],
      imports: [ConfirmVoteComponent, MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
