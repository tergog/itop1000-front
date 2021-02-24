import { Component, Input, OnInit } from '@angular/core';
import { Developer } from 'app/landing/landing-client/landing-client.component';

@Component({
  selector: 'app-landing-top',
  templateUrl: './landing-top.component.html',
  styleUrls: ['./landing-top.component.scss']
})
export class LandingTopComponent implements OnInit {

  @Input() type: 'companies' | 'developers';
  @Input() data: string[] | Developer[];

  constructor() { }

  ngOnInit(): void {
  }

}
