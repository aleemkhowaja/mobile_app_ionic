import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComplexCreditAvailabilityComponent } from './ps-complex-credit-availability.component';

describe('PsComplexCreditAvailabilityComponent', () => {
  let component: PsComplexCreditAvailabilityComponent;
  let fixture: ComponentFixture<PsComplexCreditAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsComplexCreditAvailabilityComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsComplexCreditAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
