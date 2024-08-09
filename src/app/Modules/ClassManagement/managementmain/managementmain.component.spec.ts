import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementmainComponent } from './managementmain.component';

describe('ManagementmainComponent', () => {
  let component: ManagementmainComponent;
  let fixture: ComponentFixture<ManagementmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
