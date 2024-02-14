import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteResultLineComponent } from './vote-result-line.component';

describe('VoteResultLineComponent', () => {
  const result = { option: "yes", votes: 1 };
  const total = 3;
  let component: VoteResultLineComponent;
  let fixture: ComponentFixture<VoteResultLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteResultLineComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VoteResultLineComponent);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    component.result = result;
    component.total = total;
    component.showBar = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should have a vote result", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.total = total;
    fixture.componentInstance.result = result;
    fixture.componentInstance.showBar = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.result')).toBeTruthy();
  });

  it("should have an error message if has error", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.showBar = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.error')).toBeTruthy();
  })

  it("should have a progress bar if showBar is true", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.total = total;
    fixture.componentInstance.result = result;
    fixture.componentInstance.showBar = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.bar')).toBeTruthy();
  });

  it("should not have a progress bar if showBar is false", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.total = total;
    fixture.componentInstance.result = result;
    fixture.componentInstance.showBar = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.bar')).toBeFalsy();
  })

  it("should have the correct number of votes and correct option", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.total = total;
    fixture.componentInstance.result = result;
    fixture.componentInstance.showBar = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.option').textContent).toBe("Sim");
    expect(compiled.querySelector('.total').textContent).toBe("1");
  })

  it("should have the correct fill percentage", () => {
    const compiled = fixture.nativeElement;
    fixture.componentInstance.result = result;
    fixture.componentInstance.total = total;
    fixture.componentInstance.showBar = true;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.fillPercentage).toBe(33.33333333333333);
  })
});
