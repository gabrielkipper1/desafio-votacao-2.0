import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStartComponent } from './app-start.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppStartComponent', () => {
  let component: AppStartComponent;
  let fixture: ComponentFixture<AppStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStartComponent, HttpClientModule],
      providers: [HttpClient]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
