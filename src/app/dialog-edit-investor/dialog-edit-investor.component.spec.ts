import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditInvestorComponent } from './dialog-edit-investor.component';

describe('DialogEditInvestorComponent', () => {
  let component: DialogEditInvestorComponent;
  let fixture: ComponentFixture<DialogEditInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditInvestorComponent]
    });
    fixture = TestBed.createComponent(DialogEditInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
