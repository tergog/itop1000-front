import { Params } from '@angular/router';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

// Imports from reducers
import * as fromDevelopers from './developers.reducer';
import { environment } from 'environments/environment';

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];

/**
 * Top level state declaration
 */
export interface State {
  developers: fromDevelopers.State;
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

// Map of the reducers
export const reducers: ActionReducerMap<State> = {
  developers: fromDevelopers.reducer
};

/**
 * Selectors returns smaller piece of state out of the root state
 */
export const getDevelopersState = (state: State) => state.developers;

/**
 * Selectors from Developers module
 */
export const getDevelopers = createSelector(
  getDevelopersState,
  fromDevelopers.getDevelopers
);

export const getDeveloper = createSelector(
  getDevelopersState,
  fromDevelopers.getDeveloper
);

export const getJobs = createSelector(
  getDevelopersState,
  fromDevelopers.getJobs
);

export const getLoading = createSelector(
  getDevelopersState,
  fromDevelopers.getLoading
);

export const getCategories = createSelector(
  getDevelopersState,
  fromDevelopers.getCategories
);

export const getSkills = createSelector(
  getDevelopersState,
  fromDevelopers.getSkills
);

export const getSoftSkills = createSelector(
  getDevelopersState,
  fromDevelopers.getSoftSkills
);

export const getLanguages = createSelector(
  getDevelopersState,
  fromDevelopers.getLanguages
);
