import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent implements OnInit {
  @Input() backgroundImageSearch = false

  constructor() { }

  ngOnInit(): void {
  }

}
