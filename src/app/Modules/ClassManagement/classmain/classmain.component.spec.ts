import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassmainComponent } from './classmain.component';

describe('ClassmainComponent', () => {
  let component: ClassmainComponent;
  let fixture: ComponentFixture<ClassmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
