import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructionSetComponentComponent } from './create-instruction-set-component.component';

describe('CreateInstructionSetComponentComponent', () => {
  let component: CreateInstructionSetComponentComponent;
  let fixture: ComponentFixture<CreateInstructionSetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructionSetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructionSetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
