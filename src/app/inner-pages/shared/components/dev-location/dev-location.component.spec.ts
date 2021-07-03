import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevLocationComponent } from './dev-location.component';

describe('DevLocationComponent', () => {
  let component: DevLocationComponent;
  let fixture: ComponentFixture<DevLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
