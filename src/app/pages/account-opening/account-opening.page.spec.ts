import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningPage } from './account-opening.page';

describe('AccountOpeningPage', () => {
  let component: AccountOpeningPage;
  let fixture: ComponentFixture<AccountOpeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOpeningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
