import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclassdialogComponent } from './editclassdialog.component';

describe('EditclassdialogComponent', () => {
  let component: EditclassdialogComponent;
  let fixture: ComponentFixture<EditclassdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditclassdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditclassdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
