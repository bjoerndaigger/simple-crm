import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInvestorsByAgeComponent } from './chart-investors-by-age.component';

describe('ChartInvestorsByAgeComponent', () => {
  let component: ChartInvestorsByAgeComponent;
  let fixture: ComponentFixture<ChartInvestorsByAgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartInvestorsByAgeComponent]
    });
    fixture = TestBed.createComponent(ChartInvestorsByAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
