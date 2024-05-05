import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdifferenceComponent } from './viewdifference.component';

describe('ViewdifferenceComponent', () => {
  let component: ViewdifferenceComponent;
  let fixture: ComponentFixture<ViewdifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdifferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
