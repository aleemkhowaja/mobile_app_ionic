import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDropdownCountryComponent } from './ps-dropdown-country.component';

describe('PsDropdownCountryComponent', () => {
  let component: PsDropdownCountryComponent;
  let fixture: ComponentFixture<PsDropdownCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsDropdownCountryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsDropdownCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
