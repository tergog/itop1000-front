import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DevCategoriesAndSkillsComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-categories-and-skills/dev-categories-and-skills.component';

describe('DevCategoriesAndSkillsComponent', () => {
  let component: DevCategoriesAndSkillsComponent;
  let fixture: ComponentFixture<DevCategoriesAndSkillsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DevCategoriesAndSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCategoriesAndSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
