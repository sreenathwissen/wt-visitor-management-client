import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCellRenderComponent } from './checkout-cell-render.component';

describe('CheckoutCellRenderComponent', () => {
  let component: CheckoutCellRenderComponent;
  let fixture: ComponentFixture<CheckoutCellRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutCellRenderComponent]
    });
    fixture = TestBed.createComponent(CheckoutCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
