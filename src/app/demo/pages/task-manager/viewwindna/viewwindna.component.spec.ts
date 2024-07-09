import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwindnaComponent } from './viewwindna.component';

describe('ViewwindnaComponent', () => {
  let component: ViewwindnaComponent;
  let fixture: ComponentFixture<ViewwindnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewwindnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewwindnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
