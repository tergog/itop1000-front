import { Params } from '@angular/router';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

// Imports from reducers
import * as fromCore from './core.reducer';
import { environment } from 'environments/environment';

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];

/**
 * Top level state declaration
 */
export interface State {
  core: fromCore.State;
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

// Map of the reducers
export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer
};

/**
 * Selectors returns smaller piece of state out of the root state
 */
export const getCoreState = (state: State) => state.core;

/**
 * Selectors from Core module
 */
export const getIsAuthenticated = createSelector(
    getCoreState,
    fromCore.getIsAuthenticatedSelector
);

export const getUserInfo = createSelector(
    getCoreState,
    fromCore.getUserInfoSelector
);

export const getJobs = createSelector(
  getCoreState,
  fromCore.getJobs
);

export const getDevelopers = createSelector(
  getCoreState,
  fromCore.getDevelopers
);

export const getDeveloper = createSelector(
  getCoreState,
  fromCore.getDeveloper
);
