import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListScreenComponent } from './topic-list-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TopicListScreenComponent', () => {
  let component: TopicListScreenComponent;
  let fixture: ComponentFixture<TopicListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicListScreenComponent, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
