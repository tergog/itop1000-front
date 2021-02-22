import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as coreActions from 'app/core/actions/core.actions';
import { UserService, DevelopersService } from 'app/shared/services';
import { TOKEN } from 'app/constants/constants';
import { State } from 'app/core/reducers';
import { LoadProjectsSuccessAction, UpdateUserProfileAction } from 'app/core/actions/core.actions';
import { UserInfo } from 'app/shared/models';
import { DevProjectsService } from 'app/shared/services/dev-projects.service';
import { DevProject } from 'app/shared/models/dev-project.model';

@Injectable()
export class CoreEffects {
  constructor(
      private actions$: Actions,
      private userService: UserService,
      private devProjectsService: DevProjectsService,
      private developersService: DevelopersService,
      private store: Store<State>,
      private router: Router
  ) {}

  /**
   * Saves user's auth token to localStorage
   */
  /*setToken$ = createEffect(() => this.actions$.pipe(
      ofType(coreActions.ON_LOGIN),
      tap(action => this.setUserInfoToLocalStorage(action)),
      tap(() => this.redirectToProfile())
  ), { dispatch: false });*/

  onLoadUser$ = createEffect(() => this.actions$.pipe(
    ofType(coreActions.LOAD_USER_PROFILE),
    switchMap(res => this.userService.getUserInfo().pipe(
      map((info: UserInfo) => new UpdateUserProfileAction(info))
    ))
  ));

  onLoadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(coreActions.LOAD_PROJECTS),
    switchMap(res => this.devProjectsService.getProjects().pipe(
      map((projects: DevProject[]) => new LoadProjectsSuccessAction(projects))
    ))
  ));

  onLogout$ = createEffect(() => this.actions$.pipe(
      ofType(coreActions.ON_LOGOUT),
      tap(() => this.cleanLocalStorage())
  ), { dispatch: false });

  private cleanLocalStorage(): void {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['auth/login']);
  }

  private setUserInfoToLocalStorage({ payload }): void {
    if (payload.token) {
      localStorage.setItem(TOKEN, payload.token);
    }
  }

  private redirectToProfile(): void {
    this.router.navigate(['in/profile']);
  }
}
