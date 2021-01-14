import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsIconSocialSharingComponent } from './ps-icon-social-sharing.component';

describe('PsSocialSharingComponent', () => {
  let component: PsIconSocialSharingComponent;
  let fixture: ComponentFixture<PsIconSocialSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsIconSocialSharingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsIconSocialSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
