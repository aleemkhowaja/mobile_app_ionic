import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLookupBeneficiariesInternalComponent } from './ps-lookup-beneficiaries-internal.component';

describe('PsLookupBeneficiariesInternalComponent', () => {
  let component: PsLookupBeneficiariesInternalComponent;
  let fixture: ComponentFixture<PsLookupBeneficiariesInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsLookupBeneficiariesInternalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsLookupBeneficiariesInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
