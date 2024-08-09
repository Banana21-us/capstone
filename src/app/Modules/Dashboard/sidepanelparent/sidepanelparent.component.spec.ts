import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelparentComponent } from './sidepanelparent.component';

describe('SidepanelparentComponent', () => {
  let component: SidepanelparentComponent;
  let fixture: ComponentFixture<SidepanelparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidepanelparentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidepanelparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
