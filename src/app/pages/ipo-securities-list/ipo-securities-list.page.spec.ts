import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoSecuritiesListPage } from './ipo-securities-list.page';

describe('IpoSecuritiesListPage', () => {
  let component: IpoSecuritiesListPage;
  let fixture: ComponentFixture<IpoSecuritiesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoSecuritiesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoSecuritiesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
