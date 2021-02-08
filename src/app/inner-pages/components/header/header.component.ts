import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { State } from 'app/core/reducers/index';
import { UserInfo } from 'app/shared/models';
import { getUserInfo } from 'app/core/reducers';
import { SetOnLogoutAction } from 'app/core/actions/core.actions';
import { opacityInOutAnimation } from 'app/shared/animations';
import { EUserRole } from 'app/shared/enums';
import { searchDevelopers, searchJobs } from 'app/core/developers/store/developers.actions';

enum ESearchFor {
  SearchForDeveloper = 'Search for a developer',
  SearchForJob = 'Search for a job'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [opacityInOutAnimation]
})
export class HeaderComponent implements OnInit {

  public isNotificationsOpen: boolean;
  public isPopupOpen: boolean;
  public userInfo$: Observable<UserInfo>;
  public UserRole = EUserRole;
  public userRole: string;
  public searchTerm = new FormControl('');
  SearchFor = ESearchFor;

  constructor(private store: Store<State>) {
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
      this.store.dispatch(searchDevelopers(this.searchTerm.value));
    }
  }

}
