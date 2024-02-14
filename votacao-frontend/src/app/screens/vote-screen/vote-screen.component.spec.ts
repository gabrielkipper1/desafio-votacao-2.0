import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteScreenComponent } from './vote-screen.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

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

  it("should have a header title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-text')).toBeTruthy();
  });

  it("should have a home button", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.button-home')).toBeTruthy();
  })

  it("shound have an error message if has error", () => {
    const compiled = fixture.nativeElement;
    component.errorMessage = "test";
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message')).toBeTruthy();
  })

  it("should have a loading spinner if topic is not loaded", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
  })

  it("should have a topic-detail, and voting-component if topic is loaded", () => {
    const compiled = fixture.nativeElement;
    component.topic$ = of({ category: "test", description: "test", id: 1, sessions: [] });
    fixture.detectChanges();
    expect(compiled.querySelector('.details')).toBeTruthy();
    expect(compiled.querySelector('.vote')).toBeTruthy();
  })

  it("should not have a topic-detail, and voting-component if topic is not loaded", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.details')).toBeFalsy();
    expect(compiled.querySelector('.vote')).toBeFalsy();
  })

  it("should call goToHome when home button is pressed", () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.button-home');
    spyOn(component, 'goToHome');
    button.click();
    expect(component.goToHome).toHaveBeenCalled();
  })
});
