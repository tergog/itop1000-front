import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as fromCore from 'app/core/reducers';
import { UserInfo } from 'app/shared/models';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  public userInfo$: Observable<UserInfo>;

  constructor(public router: Router, private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  handleClickButton() {
    this.router.navigate(["landing/freelancer"])
  }

}
