import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInvestmentsComponent } from './chart-investments.component';

describe('ChartInvestmentsComponent', () => {
  let component: ChartInvestmentsComponent;
  let fixture: ComponentFixture<ChartInvestmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartInvestmentsComponent]
    });
    fixture = TestBed.createComponent(ChartInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
