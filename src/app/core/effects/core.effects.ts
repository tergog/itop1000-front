import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as coreActions from 'app/core/actions/core.actions';
import { JobsService, UserService, DevelopersService } from 'app/shared/services';
import { TOKEN } from 'app/constants/constants';
import { Job, Developer } from 'app/shared/models';
import { State } from 'app/core/reducers';

@Injectable()
export class CoreEffects {
  constructor(
      private actions$: Actions,
      private userService: UserService,
      private jobsService: JobsService,
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

  onLogout$ = createEffect(() => this.actions$.pipe(
      ofType(coreActions.ON_LOGOUT),
      tap(() => this.cleanLocalStorage())
  ), { dispatch: false });

  private cleanLocalStorage(): void {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['auth/login']);
  }

  onSearchJobs$ = createEffect(() => this.actions$.pipe(
    ofType(coreActions.SEARCH_JOBS),
    switchMap(({ payload }) => this.jobsService.searchJobs(payload)),
    map((jobs: Job[]) => new coreActions.SearchJobsSuccessAction(jobs)),
    tap(() => this.router.navigate(['in/d/search-jobs']))
  ));

  private setUserInfoToLocalStorage({ payload }): void {
    if (payload.token) {
      localStorage.setItem(TOKEN, payload.token);
    }
  }

  private redirectToProfile(): void {
    this.router.navigate(['in/profile']);
  }
}
