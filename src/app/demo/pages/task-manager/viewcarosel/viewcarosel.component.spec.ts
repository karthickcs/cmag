import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcaroselComponent } from './viewcarosel.component';

describe('ViewcaroselComponent', () => {
  let component: ViewcaroselComponent;
  let fixture: ComponentFixture<ViewcaroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcaroselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcaroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
