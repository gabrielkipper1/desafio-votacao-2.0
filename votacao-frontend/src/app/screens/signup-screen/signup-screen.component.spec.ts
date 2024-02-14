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

  it('should have form fields for name, email, cpf, password, and confirm password', () => {
    const nameField = fixture.nativeElement.querySelector('input[placeholder="Nome"]');
    const emailField = fixture.nativeElement.querySelector('input[placeholder="Email"]');
    const cpfField = fixture.nativeElement.querySelector('input[placeholder="CPF"]');
    const passwordField = fixture.nativeElement.querySelector('input[placeholder="Senha"]');
    const confirmPasswordField = fixture.nativeElement.querySelector('input[placeholder="Confirmar Senha"]');
    expect(nameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(cpfField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(confirmPasswordField).toBeTruthy();
  });

  it('should call goBack method when the "Voltar" button is clicked', () => {
    spyOn(component, 'goBack');
    const goBackButton = fixture.nativeElement.querySelector('.go-back');
    goBackButton.click();
    expect(component.goBack).toHaveBeenCalled();
  });

  it('should call signup method when the "Cadastrar" button is clicked', () => {
    spyOn(component, 'signup');
    const signupButton = fixture.nativeElement.querySelector('.signup');
    signupButton.click();
    expect(component.signup).toHaveBeenCalled();
  });

});
