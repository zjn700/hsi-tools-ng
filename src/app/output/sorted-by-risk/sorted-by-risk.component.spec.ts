import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedByRiskComponent } from './sorted-by-risk.component';

describe('SortedByRiskComponent', () => {
  let component: SortedByRiskComponent;
  let fixture: ComponentFixture<SortedByRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortedByRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedByRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
