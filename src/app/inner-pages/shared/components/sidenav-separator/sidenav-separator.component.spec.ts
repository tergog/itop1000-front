import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSeparatorComponent } from './sidenav-separator.component';

describe('SidenavSeparatorComponent', () => {
  let component: SidenavSeparatorComponent;
  let fixture: ComponentFixture<SidenavSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavSeparatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
