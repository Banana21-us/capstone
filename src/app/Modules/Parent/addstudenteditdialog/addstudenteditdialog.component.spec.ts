import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudenteditdialogComponent } from './addstudenteditdialog.component';

describe('AddstudenteditdialogComponent', () => {
  let component: AddstudenteditdialogComponent;
  let fixture: ComponentFixture<AddstudenteditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddstudenteditdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstudenteditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
