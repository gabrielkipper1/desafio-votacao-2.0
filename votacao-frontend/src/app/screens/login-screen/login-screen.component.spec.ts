import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginScreenComponent } from './login-screen.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginScreenComponent, BrowserAnimationsModule,
        FormsModule, MatCardModule, MatFormFieldModule,
        MatButtonModule, MatInputModule, CommonModule,
        HttpClientModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have email and password inputs", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  })

  it('should call sign up method when button is clicked', () => {
    spyOn(component, 'signup');
    const button = fixture.debugElement.nativeElement.querySelector('.signup');
    button.click();
    expect(component.signup).toHaveBeenCalled();
  })

  it('should call login when button is pressed', () => {
    spyOn(component, 'login');
    const button = fixture.debugElement.nativeElement.querySelector('.login');
    button.click();
    expect(component.login).toHaveBeenCalled();
  })

});
