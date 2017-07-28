import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeOffsComponent } from './trade-offs.component';

describe('TradeOffsComponent', () => {
  let component: TradeOffsComponent;
  let fixture: ComponentFixture<TradeOffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
