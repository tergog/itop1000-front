import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from './developers.actions';
import { DevelopersService } from 'app/shared/services';
import { Developer } from 'app/shared/models';
import { State } from './developers.reducer';

@Injectable()
export class DevelopersEffects {
  constructor(
      private actions$: Actions,
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

}
