import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassComponent } from './addclass.component';

describe('AddclassComponent', () => {
  let component: AddclassComponent;
  let fixture: ComponentFixture<AddclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddclassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
