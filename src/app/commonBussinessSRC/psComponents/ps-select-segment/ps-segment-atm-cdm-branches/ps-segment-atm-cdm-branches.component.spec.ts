import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsSegmentAtmCdmBranchesComponent } from './ps-segment-atm-cdm-branches.component';

describe('PsSegmentAtmCdmBranchesComponent', () => {
  let component: PsSegmentAtmCdmBranchesComponent;
  let fixture: ComponentFixture<PsSegmentAtmCdmBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsSegmentAtmCdmBranchesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsSegmentAtmCdmBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
