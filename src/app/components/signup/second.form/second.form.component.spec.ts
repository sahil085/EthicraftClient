import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Second.FormComponent } from './second.form.component';

describe('Second.FormComponent', () => {
  let component: Second.FormComponent;
  let fixture: ComponentFixture<Second.FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Second.FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Second.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
