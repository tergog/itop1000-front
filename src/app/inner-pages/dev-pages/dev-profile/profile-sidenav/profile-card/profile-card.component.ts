import { Component, OnInit } from '@angular/core';
import * as fromCore from '../../../../../core/reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../../shared/models';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  userInfo$: Observable<UserInfo>;
  constructor(private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

}
