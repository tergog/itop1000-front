import {Component, Input, OnInit} from '@angular/core';
import * as fromCore from "../../../../core/reducers";
import {Store} from '@ngrx/store';

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
