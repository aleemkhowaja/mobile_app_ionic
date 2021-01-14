import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityRequestPage } from './facility-request.page';

describe('FacilityRequestPage', () => {
  let component: FacilityRequestPage;
  let fixture: ComponentFixture<FacilityRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
