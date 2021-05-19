import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSidenavComponent } from './dev-sidenav.component';

describe('DevSidenavComponent', () => {
  let component: DevSidenavComponent;
  let fixture: ComponentFixture<DevSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
