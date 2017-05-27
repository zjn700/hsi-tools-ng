import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntgrnCompletedComponent } from './intgrn-completed.component';

describe('IntgrnCompletedComponent', () => {
  let component: IntgrnCompletedComponent;
  let fixture: ComponentFixture<IntgrnCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntgrnCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntgrnCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
