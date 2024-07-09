import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashchartdesComponent } from './dashchartdes.component';

describe('DashchartdesComponent', () => {
  let component: DashchartdesComponent;
  let fixture: ComponentFixture<DashchartdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashchartdesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashchartdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
