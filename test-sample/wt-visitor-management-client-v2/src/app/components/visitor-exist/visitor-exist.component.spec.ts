import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorExistComponent } from './visitor-exist.component';

describe('VisitorExistComponent', () => {
  let component: VisitorExistComponent;
  let fixture: ComponentFixture<VisitorExistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorExistComponent]
    });
    fixture = TestBed.createComponent(VisitorExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
