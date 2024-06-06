import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwindtransacComponent } from './viewwindtransac.component';

describe('ViewwindtransacComponent', () => {
  let component: ViewwindtransacComponent;
  let fixture: ComponentFixture<ViewwindtransacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewwindtransacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewwindtransacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
