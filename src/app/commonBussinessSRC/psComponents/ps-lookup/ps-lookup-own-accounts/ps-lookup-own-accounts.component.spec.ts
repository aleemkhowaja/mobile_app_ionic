import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLookupOwnAccountsComponent } from './ps-lookup-own-accounts.component';

describe('PsLookupOwnAccountsComponent', () => {
  let component: PsLookupOwnAccountsComponent;
  let fixture: ComponentFixture<PsLookupOwnAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsLookupOwnAccountsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsLookupOwnAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
