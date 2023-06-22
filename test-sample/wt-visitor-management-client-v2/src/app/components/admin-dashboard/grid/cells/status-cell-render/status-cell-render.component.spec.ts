import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCellRenderComponent } from './status-cell-render.component';

describe('StatusCellRenderComponent', () => {
  let component: StatusCellRenderComponent;
  let fixture: ComponentFixture<StatusCellRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCellRenderComponent]
    });
    fixture = TestBed.createComponent(StatusCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
