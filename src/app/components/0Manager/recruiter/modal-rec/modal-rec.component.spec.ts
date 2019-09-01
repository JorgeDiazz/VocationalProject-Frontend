import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecComponent } from './modal-rec.component';

describe('ModalRecComponent', () => {
  let component: ModalRecComponent;
  let fixture: ComponentFixture<ModalRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
