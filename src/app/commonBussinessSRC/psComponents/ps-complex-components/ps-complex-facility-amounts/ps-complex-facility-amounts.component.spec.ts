import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComplexFacilityAmountsComponent } from './ps-complex-facility-amounts.component';

describe('PsComplexFacilityAmountsComponent', () => {
  let component: PsComplexFacilityAmountsComponent;
  let fixture: ComponentFixture<PsComplexFacilityAmountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsComplexFacilityAmountsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsComplexFacilityAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
