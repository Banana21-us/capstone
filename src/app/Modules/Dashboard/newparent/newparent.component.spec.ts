import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewparentComponent } from './newparent.component';

describe('NewparentComponent', () => {
  let component: NewparentComponent;
  let fixture: ComponentFixture<NewparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewparentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
