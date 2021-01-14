import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsBanksComponent } from './ps-banks.component';

describe('PsBanksComponent', () => {
  let component: PsBanksComponent;
  let fixture: ComponentFixture<PsBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsBanksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
