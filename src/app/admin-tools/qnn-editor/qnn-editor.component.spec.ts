import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnnEditorComponent } from './qnn-editor.component';

describe('QnnEditorComponent', () => {
  let component: QnnEditorComponent;
  let fixture: ComponentFixture<QnnEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnnEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
