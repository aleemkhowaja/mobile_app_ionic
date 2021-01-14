import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComplexAccountStatementReportComponent } from './ps-complex-account-statement-report.component';

describe('PsComplexAccountStatementReportComponent', () => {
  let component: PsComplexAccountStatementReportComponent;
  let fixture: ComponentFixture<PsComplexAccountStatementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsComplexAccountStatementReportComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsComplexAccountStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
