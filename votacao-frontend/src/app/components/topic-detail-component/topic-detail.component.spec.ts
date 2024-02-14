import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailComponent } from './topic-detail.component';
import { Topic } from '../../interfaces/topic';

describe('TopicDetailComponent', () => {
  let component: TopicDetailComponent;
  let fixture: ComponentFixture<TopicDetailComponent>;
  let topic: Topic = {
    category: "test category",
    description: "test description",
    id: 1,
    sessions: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicDetailComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    component.topic = topic
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should have a header title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header')).toBeTruthy();
  })

  it("should have a topic title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.topic-header')).toBeTruthy();
  });

  it("should have a category title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.category-header')).toBeTruthy();
  })

  it("should have a description and a correct text value if topic not null", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.topic = topic;
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-description')).toBeTruthy();
    expect(compiled.querySelector('.topic-description').textContent).toEqual(topic.description);
    expect(compiled.querySelector('.no-description')).toBeFalsy();
  })

  it("should not have a description if topic is undefined", () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-description')).toBeFalsy();
    expect(compiled.querySelector('.no-description')).toBeTruthy();
  })

  it("should have a category and a correct text value if topic not null", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.topic = topic;
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-category')).toBeTruthy();
    expect(compiled.querySelector('.topic-category').textContent).toEqual(topic.category);
    expect(compiled.querySelector('.no-category')).toBeFalsy();
  })

  it("should not have a category if topic is undefined", () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-category')).toBeFalsy();
    expect(compiled.querySelector('.no-category')).toBeTruthy();
  })
});
