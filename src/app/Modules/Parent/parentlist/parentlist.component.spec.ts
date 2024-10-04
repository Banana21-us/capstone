import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentlistComponent } from './parentlist.component';

describe('ParentlistComponent', () => {
  let component: ParentlistComponent;
  let fixture: ComponentFixture<ParentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
