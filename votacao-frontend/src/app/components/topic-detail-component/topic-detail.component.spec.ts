import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailComponent } from './topic-detail.component';
import { Topic } from '../../interfaces/topic';

describe('TopicDetailComponent', () => {
  let component: TopicDetailComponent;
  let fixture: ComponentFixture<TopicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailComponent]
    })
      .compileComponents();

    const topic: Topic = {
      category: "test",
      description: "test",
      id: 1,
      sessions: [],
    }

    fixture = TestBed.createComponent(TopicDetailComponent);
    component = fixture.componentInstance;
    component.topic = topic
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
