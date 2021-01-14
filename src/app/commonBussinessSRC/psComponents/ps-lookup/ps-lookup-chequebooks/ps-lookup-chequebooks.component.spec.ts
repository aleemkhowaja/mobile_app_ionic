import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLookupChequebooksComponent } from './ps-lookup-chequebooks.component';

describe('PsLookupChequebooksComponent', () => {
  let component: PsLookupChequebooksComponent;
  let fixture: ComponentFixture<PsLookupChequebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsLookupChequebooksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsLookupChequebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
