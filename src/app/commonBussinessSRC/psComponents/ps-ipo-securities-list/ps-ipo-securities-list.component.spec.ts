import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsIpoSecuritiesListComponent } from './ps-ipo-securities-list.component';

describe('PsIpoSecuritiesListComponent', () => {
  let component: PsIpoSecuritiesListComponent;
  let fixture: ComponentFixture<PsIpoSecuritiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsIpoSecuritiesListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsIpoSecuritiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
