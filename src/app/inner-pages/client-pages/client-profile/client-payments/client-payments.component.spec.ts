import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientPaymentsComponent } from 'app/inner-pages/client-pages/client-profile/client-payments/client-payments.component';

describe('ClientPaymentsComponent', () => {
  let component: ClientPaymentsComponent;
  let fixture: ComponentFixture<ClientPaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
