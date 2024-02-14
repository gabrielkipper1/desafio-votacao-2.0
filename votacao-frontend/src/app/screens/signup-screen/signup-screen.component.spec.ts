import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupScreenComponent } from './signup-screen.component';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupScreenComponent', () => {
  let component: SignupScreenComponent;
  let fixture: ComponentFixture<SignupScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignupScreenComponent,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
