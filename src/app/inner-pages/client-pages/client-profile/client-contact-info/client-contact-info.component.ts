import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { ClientProfileService } from 'app/inner-pages/client-pages/client-profile/client-profile.service';

@Component({
  selector: 'app-client-contact-info',
  templateUrl: './client-contact-info.component.html',
  styleUrls: ['./client-contact-info.component.scss']
})
export class ClientContactInfoComponent implements OnInit {

  public isAccountEdit: boolean;
  public isLocationEdit: boolean;
  public userInfo$: Observable<UserInfo>;

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
    private userService: UserService,
    private clientProfileService: ClientProfileService,
    private store: Store<fromCore.State>,
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public editAccountToggle(): void {
    this.isAccountEdit = !this.isAccountEdit;
  }

  public editLocationToggle(): void {
    this.isLocationEdit = !this.isLocationEdit;
  }

  public onSaveAccountClick(userInfo: Partial<UserInfo>): void {
    this.clientProfileService.onSaveClick(userInfo);
    this.isAccountEdit = false;
  }

  public onSaveLocationClick(userInfo: Partial<UserInfo>): void {
    this.clientProfileService.onSaveClick(userInfo);
    this.isLocationEdit = false;
  }

  ngOnDestroy(): void {}
}
