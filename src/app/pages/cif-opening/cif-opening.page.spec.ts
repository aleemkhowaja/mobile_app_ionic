import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CifOpeningPage } from './cif-opening.page';

describe('CifOpeningPage', () => {
  let component: CifOpeningPage;
  let fixture: ComponentFixture<CifOpeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CifOpeningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CifOpeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
