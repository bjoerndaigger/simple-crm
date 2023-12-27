import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInvestorsByCountryComponent } from './chart-investors-by-country.component';

describe('ChartInvestorsByCountryComponent', () => {
  let component: ChartInvestorsByCountryComponent;
  let fixture: ComponentFixture<ChartInvestorsByCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartInvestorsByCountryComponent]
    });
    fixture = TestBed.createComponent(ChartInvestorsByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
