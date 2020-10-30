import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

@Component({
  selector: 'app-client-contact-info',
  templateUrl: './client-contact-info.component.html',
  styleUrls: ['./client-contact-info.component.scss']
})
export class ClientContactInfoComponent implements OnInit {

  public isEdit: boolean;
  public userInfo$: Observable<UserInfo>;

  constructor(
    private store: Store<fromCore.State>,
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public editToggle(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(): void {
    this.isEdit = false;
  }
}
