import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwindComponent } from './viewwind.component';

describe('ViewwindComponent', () => {
  let component: ViewwindComponent;
  let fixture: ComponentFixture<ViewwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewwindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
