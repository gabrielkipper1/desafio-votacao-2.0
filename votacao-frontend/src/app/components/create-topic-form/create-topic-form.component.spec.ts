import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicFormComponent } from './create-topic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTopicFormComponent', () => {
  let component: CreateTopicFormComponent;
  let fixture: ComponentFixture<CreateTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTopicFormComponent, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2')).toBeTruthy();
  });

  it("should have a form", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it("should have text fields for category and description and time", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[formControlName="description"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="category"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="duration"]')).toBeTruthy();
  });

  it('should call createTopic when button is clicked', () => {
    spyOn(component, 'createTopic');
    const button = fixture.debugElement.nativeElement.querySelector('.create-button');
    button.click();
    expect(component.createTopic).toHaveBeenCalled();
  })

  it('should update form values when input is changed', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input[formControlName="category"]');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    expect(component.topicForm.value.category).toBe('test');
  })

  it('should have a home button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.button-home')).toBeTruthy();
  })

  it('should call goToHome when home button is pressed', () => {
    spyOn(component, 'goToHome');
    const button = fixture.debugElement.nativeElement.querySelector('.button-home');
    button.click();
    expect(component.goToHome).toHaveBeenCalled();
  })
});
