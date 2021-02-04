import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
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
    switchMap(( {payload} ) => this.developersService.searchDevelopers(payload).pipe(
      map((developers: Developer[]) => actions.searchDevelopersSuccess(developers)),
      tap(() => this.router.navigate(['in/c/search-developers'])),
      catchError((err: any) => of(actions.searchDevelopersError(err)))
    )),
  ));

  onSetDeveloper$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SET_DEVELOPER),
    switchMap(( {id} ) => this.developersService.getDeveloper(id).pipe(
      map((developer: Developer) => actions.setDeveloperSuccess(developer)),
      tap((obj) => this.router.navigate([`in/c/search-developers/${obj.developer.id}`])),
      catchError((err: any) => of(actions.setDeveloperError(err)))
    )),
  ));

  onSearchJobs$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEARCH_JOBS),
    switchMap((payload: any) => this.jobsService.searchJobs(payload.payload).pipe(
      map((jobs: Job[]) => actions.searchJobsSuccess(jobs)),
      tap(() => this.router.navigate(['in/d/search-jobs'])),
      catchError((err: any) => of(actions.searchJobsError(err)))
    )),
  ));

  getSkills$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_DEVELOPER_SKILLS),
    switchMap((payload) => this.developersService.getDeveloperSkills().pipe(
      first(),
      map(value => actions.getDeveloperSkillsSuccess(value)),
    )),
  ));

  getCategories$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_DEVELOPER_CATEGORIES),
    switchMap((payload) => this.developersService.getDeveloperCategories().pipe(
      first(),
      map(value => actions.getDeveloperCategoriesSuccess(value)),
    )),
  ));

  getLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_DEVELOPER_LANGUAGES),
    switchMap((payload) => this.developersService.getDeveloperLanguages().pipe(
      first(),
      map(value => actions.getDeveloperLanguagesSuccess(value)),
    )),
  ));

  getSoftSkills$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_DEVELOPER_SOFT_SKILLS),
    switchMap((payload) => this.developersService.getDeveloperSoftSkills().pipe(
      first(),
      map(value => actions.getDeveloperSoftSkillsSuccess(value)),
    )),
  ));
}
