import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PsDisplayOnlyCurrencyAmountComponent } from './ps-display-only-currency-amount.component';


describe('PsComplexAmountComponent', () => {
  let component: PsDisplayOnlyCurrencyAmountComponent;
  let fixture: ComponentFixture<PsDisplayOnlyCurrencyAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsDisplayOnlyCurrencyAmountComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsDisplayOnlyCurrencyAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
