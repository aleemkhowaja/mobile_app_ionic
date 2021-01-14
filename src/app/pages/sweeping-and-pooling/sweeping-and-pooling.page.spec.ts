import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepingAndPoolingPage } from './sweeping-and-pooling.page';

describe('SweepingAndPoolingPage', () => {
  let component: SweepingAndPoolingPage;
  let fixture: ComponentFixture<SweepingAndPoolingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweepingAndPoolingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweepingAndPoolingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
