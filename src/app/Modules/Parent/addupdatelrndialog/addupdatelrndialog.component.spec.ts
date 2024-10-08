import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdatelrndialogComponent } from './addupdatelrndialog.component';

describe('AddupdatelrndialogComponent', () => {
  let component: AddupdatelrndialogComponent;
  let fixture: ComponentFixture<AddupdatelrndialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdatelrndialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddupdatelrndialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
