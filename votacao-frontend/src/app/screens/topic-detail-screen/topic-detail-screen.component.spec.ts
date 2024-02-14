import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopicDetailScreenComponent } from './topic-detail-screen.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

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

  it("should have a header title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-text')).toBeTruthy();
  })

  it("should have a home button", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.button-home')).toBeTruthy();
  })

  it("shound have an error message if has error", () => {
    const compiled = fixture.nativeElement;
    const componenet = fixture.componentInstance;
    component.errorMessage = "test";
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message')).toBeTruthy();
  })

  it("should have a loading spinner if topic is not loaded", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
  })

  it("should have a topic-detail, session-timer and voting-result componenets if topic is loaded", () => {
    const compiled = fixture.nativeElement;
    component.topic$ = of({ category: "test", description: "test", id: 1, sessions: [] });
    fixture.detectChanges();
    expect(compiled.querySelector('app-topic-detail')).toBeTruthy();
    expect(compiled.querySelector('app-session-timer')).toBeTruthy();
    expect(compiled.querySelector('app-voting-result')).toBeTruthy();
  })
});
