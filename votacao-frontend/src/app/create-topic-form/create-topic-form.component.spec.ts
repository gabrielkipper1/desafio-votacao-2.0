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
});
