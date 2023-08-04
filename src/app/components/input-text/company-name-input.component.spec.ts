import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNameInput } from './company-name-input.component';

describe('InputTextComponent', () => {
  let component: CompanyNameInput;
  let fixture: ComponentFixture<CompanyNameInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyNameInput]
    });
    fixture = TestBed.createComponent(CompanyNameInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
