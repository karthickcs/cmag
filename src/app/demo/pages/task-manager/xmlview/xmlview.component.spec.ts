import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlviewComponent } from './xmlview.component';

describe('XmlviewComponent', () => {
  let component: XmlviewComponent;
  let fixture: ComponentFixture<XmlviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmlviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
