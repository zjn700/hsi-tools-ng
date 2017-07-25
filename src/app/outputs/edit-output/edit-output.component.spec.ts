import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutputComponent } from './edit-output.component';

describe('EditOutputComponent', () => {
  let component: EditOutputComponent;
  let fixture: ComponentFixture<EditOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
