import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainEditorComponent } from './domain-editor.component';

describe('DomainEditorComponent', () => {
  let component: DomainEditorComponent;
  let fixture: ComponentFixture<DomainEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
