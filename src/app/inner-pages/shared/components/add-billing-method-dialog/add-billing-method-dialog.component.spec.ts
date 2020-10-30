import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillingMethodDialogComponent } from './add-billing-method-dialog.component';

describe('AddBillingMethodDialogComponent', () => {
  let component: AddBillingMethodDialogComponent;
  let fixture: ComponentFixture<AddBillingMethodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillingMethodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillingMethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
