import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLookupBeneficiariesLocalComponent } from './ps-lookup-beneficiaries-local.component';

describe('PsLookupBeneficiariesLocalComponent', () => {
  let component: PsLookupBeneficiariesLocalComponent;
  let fixture: ComponentFixture<PsLookupBeneficiariesLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsLookupBeneficiariesLocalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsLookupBeneficiariesLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
