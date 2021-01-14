import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsSelectLookupOptionListComponent } from './ps-select-lookup-option-list.component';

describe('PsSelectLookupOptionListComponent', () => {
  let component: PsSelectLookupOptionListComponent;
  let fixture: ComponentFixture<PsSelectLookupOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsSelectLookupOptionListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsSelectLookupOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
