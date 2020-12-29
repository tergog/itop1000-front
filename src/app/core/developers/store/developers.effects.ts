import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as actions from './developers.actions';
import { DevelopersService, JobsService } from 'app/shared/services';
import { Developer, Job } from 'app/shared/models';
import { State } from './developers.reducer';

@Injectable()
export class DevelopersEffects {
  constructor(
      private actions$: Actions,
      private jobsService: JobsService,
      private developersService: DevelopersService,
      private store: Store<State>,
      private router: Router
  ) {}

  onSearchDevelopers$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEARCH_DEVELOPERS),
    mergeMap(( {payload} ) => this.developersService.searchDevelopers(payload)),
    map((developers: Developer[]) => actions.searchDevelopersSuccess(developers)),
    tap(() => this.router.navigate(['in/c/search-developers']))
  ));

  onSetDeveloper$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SET_DEVELOPER),
    mergeMap(( {id} ) => this.developersService.getDeveloper(id)),
    map((developer: Developer) => actions.setDeveloperSuccess(developer)),
    tap((obj) => this.router.navigate([`in/c/search-developers/${obj.developer.id}`]))
  ));

  onSearchJobs$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEARCH_JOBS),
    switchMap((payload) => this.jobsService.searchJobs(payload).pipe(
      map((jobs: Job[]) => actions.searchJobsSuccess(jobs)),
      tap(() => this.router.navigate(['in/d/search-jobs'])),
      catchError(err => of(actions.searchJobsError(err)))
    )),
    
  ));

}
