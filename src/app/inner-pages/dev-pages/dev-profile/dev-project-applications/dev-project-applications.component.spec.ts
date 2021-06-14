import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProjectApplicationsComponent } from './dev-project-applications.component';

describe('DevProjectApplicationsComponent', () => {
  let component: DevProjectApplicationsComponent;
  let fixture: ComponentFixture<DevProjectApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevProjectApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevProjectApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
