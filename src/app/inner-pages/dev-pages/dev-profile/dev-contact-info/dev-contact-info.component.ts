import { Component, OnInit, Output, EventEmitter, OnDestroy   } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  public isAccountEdit: boolean;
  public isLocationEdit: boolean;

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
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

  public onSaveAccountClick(): void {
    this.isAccountEdit = false;
  }

  public onSaveLocationClick(): void {
    this.isLocationEdit = false;
  }

}
