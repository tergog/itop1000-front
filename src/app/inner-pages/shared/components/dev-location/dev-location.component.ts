import { Component, OnInit } from '@angular/core';
import * as fromCore from "../../../../core/reducers";
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-dev-location',
  templateUrl: './dev-location.component.html',
  styleUrls: ['./dev-location.component.scss']
})
export class DevLocationComponent implements OnInit {

  userInfo$
  constructor(private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

}
