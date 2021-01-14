import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLookupBeneficiariesInternationalComponent } from './ps-lookup-beneficiaries-international.component';

describe('PsLookupBeneficiariesInternationalComponent', () => {
  let component: PsLookupBeneficiariesInternationalComponent;
  let fixture: ComponentFixture<PsLookupBeneficiariesInternationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsLookupBeneficiariesInternationalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsLookupBeneficiariesInternationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
