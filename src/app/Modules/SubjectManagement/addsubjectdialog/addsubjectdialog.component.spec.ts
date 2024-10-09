import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubjectdialogComponent } from './addsubjectdialog.component';

describe('AddsubjectdialogComponent', () => {
  let component: AddsubjectdialogComponent;
  let fixture: ComponentFixture<AddsubjectdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsubjectdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
