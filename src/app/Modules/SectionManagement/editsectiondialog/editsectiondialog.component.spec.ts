import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsectiondialogComponent } from './editsectiondialog.component';

describe('EditsectiondialogComponent', () => {
  let component: EditsectiondialogComponent;
  let fixture: ComponentFixture<EditsectiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsectiondialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsectiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
