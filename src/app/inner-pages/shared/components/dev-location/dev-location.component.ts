import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-location',
  templateUrl: './dev-location.component.html',
  styleUrls: ['./dev-location.component.scss']
})
export class DevLocationComponent implements OnInit {

  @Input() date;
  @Input() address;
  constructor() { }

  ngOnInit(): void {
  }

}
