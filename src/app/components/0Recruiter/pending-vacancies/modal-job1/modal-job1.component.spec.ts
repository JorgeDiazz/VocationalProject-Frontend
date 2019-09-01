import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJob1Component } from './modal-job1.component';

describe('ModalJob1Component', () => {
  let component: ModalJob1Component;
  let fixture: ComponentFixture<ModalJob1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJob1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJob1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
