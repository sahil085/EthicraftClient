import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeRegistrationFormComponent } from './college-registration-form.component';

describe('CollegeRegistrationFormComponent', () => {
  let component: CollegeRegistrationFormComponent;
  let fixture: ComponentFixture<CollegeRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
