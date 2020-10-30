import { createAction, props } from '@ngrx/store';

import { Developer } from 'app/shared/models';

export const SEARCH_DEVELOPERS = '[Developers] Search developers';
export const SEARCH_DEVELOPERS_SUCCESS = '[Developers] Search developers success';
export const SET_DEVELOPER = '[Developers] Set developer';


export const searchDevelopers = createAction(SEARCH_DEVELOPERS, props<{ payload: string }>());

export const searchDevelopersSuccess = createAction(SEARCH_DEVELOPERS_SUCCESS, (developersList: Developer[]) => ({developersList}));

export const setDeveloper = createAction(SET_DEVELOPER, props<{ id: string }>());

