import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevApprovedProjectsComponent } from './dev-approved-projects.component';

describe('DevApprovedProjectsComponent', () => {
  let component: DevApprovedProjectsComponent;
  let fixture: ComponentFixture<DevApprovedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevApprovedProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevApprovedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
