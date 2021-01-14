import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersListReportPage } from './transfers-list-report.page';

describe('TransfersListReportPage', () => {
  let component: TransfersListReportPage;
  let fixture: ComponentFixture<TransfersListReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfersListReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersListReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
