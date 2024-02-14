import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopicDetailScreenComponent } from './topic-detail-screen.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

describe('TopicDetailScreenComponent', () => {
  let component: TopicDetailScreenComponent;
  let fixture: ComponentFixture<TopicDetailScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailScreenComponent, RouterTestingModule],
      providers: [],

    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
