import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { TopicListScreenComponent } from './topic-list-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

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

  it('should have a search input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[placeholder="Buscar por categoria"]')).toBeTruthy();
  })

  it('should NOT have a button to create a new topic if user NOT authorized', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.canCreateTopic = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-add')).toBeFalsy();
  });

  it('should have a button to create a new topic if user is authorized', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.canCreateTopic = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-add')).toBeTruthy();
  });

  it('should call the search method when text field updated', () => {
    spyOn(component, "update");
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.update).toHaveBeenCalled();
  });

  it('should have a sign in button if not logged in', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-signin')).toBeTruthy();
  });

  it('should not have a sign in button if logged in', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-signin')).toBeFalsy();
  });

  it('should have a sign out button if logged in', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-signout')).toBeTruthy();
  });

  it('should not have a sign out button if not logged in', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.button-signout')).toBeFalsy();
  });

  it('should call signOut method when button is clicked', () => {
    spyOn(component, 'signOut');
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = true;
    fixture.detectChanges();
    const button = compiled.querySelector('.button-signout');
    button.click();
    expect(component.signOut).toHaveBeenCalled();
  })

  it('should call login method when button is clicked', () => {
    spyOn(component, 'signIn');
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.isSignedIn = false;
    fixture.detectChanges();
    const button = compiled.querySelector('.button-signin');
    button.click();
    expect(component.signIn).toHaveBeenCalled();
  })

  it('should call onCreateNewTopicClicked method when button is clicked', () => {
    spyOn(component, 'onCreateNewTopicClicked');
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.canCreateTopic = true;
    fixture.detectChanges();
    const button = compiled.querySelector('.button-add');
    button.click();
    expect(component.onCreateNewTopicClicked).toHaveBeenCalled();
  })

  it('should display error message if there is an error', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.errorMessage = "test";
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message-text')).toBeTruthy();
  })

  it('should not display error message if there is no error', () => {
    const compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    component.errorMessage = undefined;
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message-text')).toBeFalsy();
  })

  it('should show loading spinner if loading', async () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.loading')).toBeTruthy();
  })

  it('should not show loading spinner if itens loaded', async () => {
    const compiled = fixture.nativeElement;
    component.topics$ = of([{ id: 1, category: "test", description: "test", sessions: [] }]);
    fixture.detectChanges();
    expect(compiled.querySelector('.loading')).toBeFalsy();
  })

  it('should have a list of topics', async () => {
    const compiled = fixture.nativeElement;
    component.topics$ = of([{ id: 1, category: "test", description: "test", sessions: [] }]);
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-list')).toBeTruthy();
    expect(compiled.querySelector('.no-topics')).toBeFalsy();
  })

  it('should have a list of topics with 0 elements', async () => {
    const compiled = fixture.nativeElement;
    component.topics$ = of([]);
    fixture.detectChanges();
    expect(compiled.querySelector('.topic-list')).toBeFalsy();
    expect(compiled.querySelector('.no-topics')).toBeTruthy();
  })
});
