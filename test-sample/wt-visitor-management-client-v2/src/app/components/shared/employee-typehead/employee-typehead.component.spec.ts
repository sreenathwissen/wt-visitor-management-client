import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypeheadComponent } from './employee-typehead.component';

describe('EmployeeTypeheadComponent', () => {
  let component: EmployeeTypeheadComponent;
  let fixture: ComponentFixture<EmployeeTypeheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeTypeheadComponent]
    });
    fixture = TestBed.createComponent(EmployeeTypeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
