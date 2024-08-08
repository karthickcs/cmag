import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashchartmetaComponent } from './dashchartmeta.component';

describe('DashchartmetaComponent', () => {
  let component: DashchartmetaComponent;
  let fixture: ComponentFixture<DashchartmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashchartmetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashchartmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
