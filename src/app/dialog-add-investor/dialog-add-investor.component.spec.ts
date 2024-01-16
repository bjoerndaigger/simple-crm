import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddInvestorComponent } from './dialog-add-investor.component';
import { InteractivityChecker } from '@angular/cdk/a11y';

describe('DialogAddInvestorComponent', () => {
  let component: DialogAddInvestorComponent;
  let fixture: ComponentFixture<DialogAddInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddInvestorComponent],
      providers: [
        {
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // Überschreibung des interactivityChecker
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DialogAddInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
