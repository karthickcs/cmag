import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaccComponent } from './viewacc.component';

describe('ViewaccComponent', () => {
  let component: ViewaccComponent;
  let fixture: ComponentFixture<ViewaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewaccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
