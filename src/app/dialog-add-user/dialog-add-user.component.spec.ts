import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddUserComponent } from './dialog-add-user.component';
import { InteractivityChecker } from '@angular/cdk/a11y';

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddUserComponent],
      providers: [
        {
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // Überschreibung des interactivityChecker
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
