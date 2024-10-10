import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubjectdialogComponent } from './editsubjectdialog.component';

describe('EditsubjectdialogComponent', () => {
  let component: EditsubjectdialogComponent;
  let fixture: ComponentFixture<EditsubjectdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsubjectdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsubjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
