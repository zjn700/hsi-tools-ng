import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntgrnArchiveComponent } from './intgrn-archive.component';

describe('IntgrnArchiveComponent', () => {
  let component: IntgrnArchiveComponent;
  let fixture: ComponentFixture<IntgrnArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntgrnArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntgrnArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
