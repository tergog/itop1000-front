import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterLandingComponent } from 'app/inner-pages/components/footer-landing/footer-landing.component';

describe('FooterLandingComponent', () => {
  let component: FooterLandingComponent;
  let fixture: ComponentFixture<FooterLandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
