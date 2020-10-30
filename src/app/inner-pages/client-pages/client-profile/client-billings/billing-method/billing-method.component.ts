import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-method',
  templateUrl: './billing-method.component.html',
  styleUrls: ['./billing-method.component.scss']
})
export class BillingMethodComponent implements OnInit {

  @Input() billingMethod: any;

  constructor() { }

  ngOnInit(): void {
  }

}
