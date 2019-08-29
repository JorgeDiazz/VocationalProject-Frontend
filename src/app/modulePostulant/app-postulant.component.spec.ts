import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostulantComponent } from './app-postulant.component';

describe('AppPostulantComponent', () => {
  let component: AppPostulantComponent;
  let fixture: ComponentFixture<AppPostulantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPostulantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
