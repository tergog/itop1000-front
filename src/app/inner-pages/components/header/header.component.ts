import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import { UserInfo } from 'app/shared/models';
import { getUserInfo } from 'app/core/reducers';
import { SetOnLogoutAction } from 'app/core/actions/core.actions';
import { searchJobs } from 'app/core/developers/store/developers.actions'
import { opacityInOutAnimation } from 'app/shared/animations';
import { UserRole } from 'app/shared/enums';
import { searchDevelopers } from 'app/core/developers/store/developers.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [opacityInOutAnimation]
})
export class HeaderComponent implements OnInit {

  public isPopupOpen: boolean;
  public userInfo$: Observable<UserInfo>;
  public UserRole = UserRole;
  public userRole: string;
  public searchTerm = new FormControl();

  constructor(private store: Store<fromCore.State>) {
  }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(getUserInfo)
      .pipe(
        filter(user => !!user),
        tap(({role}) => this.userRole = role)
      );
  }

  public togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
  }

  public logout(): void {
    this.store.dispatch(new SetOnLogoutAction());
  }

  public onSearch(): void {
    if (this.userRole === this.UserRole.Dev) {
      this.store.dispatch(searchJobs(this.searchTerm.value));
    } else {
      this.store.dispatch(searchDevelopers({payload: this.searchTerm.value}));
    }
  }

}
