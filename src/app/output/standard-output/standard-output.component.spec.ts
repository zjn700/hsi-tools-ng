import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardOutputComponent } from './standard-output.component';

describe('StandardOutputComponent', () => {
  let component: StandardOutputComponent;
  let fixture: ComponentFixture<StandardOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
