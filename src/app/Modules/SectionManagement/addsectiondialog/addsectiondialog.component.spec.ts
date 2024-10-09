import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsectiondialogComponent } from './addsectiondialog.component';

describe('AddsectiondialogComponent', () => {
  let component: AddsectiondialogComponent;
  let fixture: ComponentFixture<AddsectiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsectiondialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsectiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
