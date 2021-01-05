import { createAction, props } from '@ngrx/store';

import { Developer } from 'app/shared/models';

export const SEARCH_DEVELOPERS = '[Developers] Search developers';
export const SEARCH_DEVELOPERS_SUCCESS = '[Developers] Search developers success';
export const SET_DEVELOPER = '[Developers] Set developer';
export const SET_DEVELOPER_SUCCESS = '[Developers] Set developer success';
export const UPDATE_DEVELOPER = '[Developers] Update developer';

export const SET_DEVELOPER_CATEGORIES = '[Developers] Set developer categories';
export const SET_DEVELOPER_SKILLS = '[Developers] Set developer skills';
export const SET_DEVELOPER_LANGUAGES = '[Developers] Set developer soft languages';
export const SET_DEVELOPER_SOFT_SKILLS = '[Developers] Set developer soft skills';


export const searchDevelopers = createAction(SEARCH_DEVELOPERS, props<{ payload: string }>());
export const searchDevelopersSuccess = createAction(SEARCH_DEVELOPERS_SUCCESS, (developersList: Developer[]) => ({developersList}));
export const setDeveloper = createAction(SET_DEVELOPER, props<{ id: string }>());
export const setDeveloperSuccess = createAction(SET_DEVELOPER_SUCCESS, (developer: Developer) => ({developer}));
export const updateDeveloper = createAction(UPDATE_DEVELOPER, props<{ id: string }>());

export const setDeveloperCategories = createAction(SET_DEVELOPER_CATEGORIES, (data: object) => ({data}));
export const setDeveloperSkills = createAction(SET_DEVELOPER_SKILLS, (data: object) => ({data}));
export const setDeveloperLanguages = createAction(SET_DEVELOPER_LANGUAGES, (data: object) => ({data}));
export const setDeveloperSoftSkills = createAction(SET_DEVELOPER_SOFT_SKILLS, (data: object) => ({data}));
