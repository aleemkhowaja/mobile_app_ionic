import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComplexMenuHeaderContainerComponent } from './ps-complex-menu-header-container.component';

describe('PsComplexMenuHeaderContainerComponent', () => {
  let component: PsComplexMenuHeaderContainerComponent;
  let fixture: ComponentFixture<PsComplexMenuHeaderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsComplexMenuHeaderContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsComplexMenuHeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
