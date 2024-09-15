import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranviewComponent } from './tranview.component';

describe('TranviewComponent', () => {
  let component: TranviewComponent;
  let fixture: ComponentFixture<TranviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
