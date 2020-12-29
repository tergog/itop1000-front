import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientBillingsComponent } from './client-billings.component';

describe('ClientBillingsComponent', () => {
  let component: ClientBillingsComponent;
  let fixture: ComponentFixture<ClientBillingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
