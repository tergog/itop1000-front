import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLandingComponent } from 'app/inner-pages/components/footer-landing/footer-landing.component';

describe('FooterLandingComponent', () => {
  let component: FooterLandingComponent;
  let fixture: ComponentFixture<FooterLandingComponent>;

  beforeEach(async(() => {
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
