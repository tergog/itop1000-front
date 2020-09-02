import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DevProfileService } from './../dev-profile.service';
import { UserService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

@Component({
  selector: 'app-dev-contact-info',
  templateUrl: './dev-contact-info.component.html',
  styleUrls: ['./dev-contact-info.component.scss']
})
export class DevContactInfoComponent implements OnInit {

  public userInfo$: Observable<UserInfo>;

  public isEdit: boolean;

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
    private devProfileService: DevProfileService,
    private userService: UserService,
    private store: Store<fromCore.State>,
    ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
    this.devProfileService.initUpdateProfileService();
  }

  public editToggle(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.devProfileService.onSaveClick(userInfo);
    this.isEdit = false;
  }

}
