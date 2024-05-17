import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbytranComponent } from './viewbytran.component';

describe('ViewbytranComponent', () => {
  let component: ViewbytranComponent;
  let fixture: ComponentFixture<ViewbytranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbytranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbytranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
