import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlrndialogComponent } from './addlrndialog.component';

describe('AddlrndialogComponent', () => {
  let component: AddlrndialogComponent;
  let fixture: ComponentFixture<AddlrndialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlrndialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlrndialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
