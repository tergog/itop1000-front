import { createAction, props } from '@ngrx/store';

import { Developer, Job, NameValueModel } from 'app/shared/models';

export const SEARCH_DEVELOPERS = '[Developers] Search developers';
export const SEARCH_DEVELOPERS_SUCCESS = '[Developers] Search developers success';
export const SEARCH_DEVELOPERS_ERROR = '[Developers] Search developers error';

export const SET_DEVELOPER = '[Developers] Set developer';
export const SET_DEVELOPER_SUCCESS = '[Developers] Set developer success';
export const SET_DEVELOPER_ERROR = '[Developers] Set developer error';

export const SEARCH_JOBS = '[Developers] Search jobs';
export const SEARCH_JOBS_SUCCESS = '[Developers] Search jobs success';
export const SEARCH_JOBS_ERROR = '[Developers] Search jobs error';

export const UPDATE_DEVELOPER = '[Developers] Update developer';

export const GET_DEVELOPER_CATEGORIES = '[Developers] Get developer categories';
export const GET_DEVELOPER_CATEGORIES_SUCCESS = '[Developers] Get developer categories success';
export const GET_DEVELOPER_SKILLS = '[Developers] Get developer skills';
export const GET_DEVELOPER_SKILLS_SUCCESS = '[Developers] Get developer skills success';
export const GET_DEVELOPER_LANGUAGES = '[Developers] Get developer soft languages';
export const GET_DEVELOPER_LANGUAGES_SUCCESS = '[Developers] Get developer languages success';
export const GET_DEVELOPER_SOFT_SKILLS = '[Developers] Get developer soft skills';
export const GET_DEVELOPER_SOFT_SKILLS_SUCCESS  = '[Developers] Get developer soft skills success';

export const searchDevelopers = createAction(SEARCH_DEVELOPERS, props<{ payload: string }>());
export const searchDevelopersSuccess = createAction(SEARCH_DEVELOPERS_SUCCESS, (developersList: Developer[]) => ({developersList}));
export const searchDevelopersError = createAction(SEARCH_DEVELOPERS_ERROR, (error: any) => (error));
export const searchJobs = createAction(SEARCH_JOBS, props<{ payload: string }>());
export const searchJobsSuccess = createAction(SEARCH_JOBS_SUCCESS, (jobs: Job[]) => ({jobs}));
export const searchJobsError = createAction(SEARCH_JOBS_ERROR, (error: any) => (error));
export const setDeveloper = createAction(SET_DEVELOPER, props<{ id: string }>());
export const setDeveloperSuccess = createAction(SET_DEVELOPER_SUCCESS, (developer: Developer) => ({developer}));
export const setDeveloperError = createAction(SET_DEVELOPER_ERROR, (error: any) => (error));
export const updateDeveloper = createAction(UPDATE_DEVELOPER, props<{ id: string }>());

export const getDeveloperSkillsAction = createAction(GET_DEVELOPER_SKILLS);
export const getDeveloperCategoriesAction = createAction(GET_DEVELOPER_CATEGORIES);
export const getDeveloperLanguagesAction = createAction(GET_DEVELOPER_LANGUAGES);
export const getDeveloperSoftSkillsAction = createAction(GET_DEVELOPER_SOFT_SKILLS);

export const getDeveloperSkillsSuccess = createAction(
  GET_DEVELOPER_SKILLS_SUCCESS
  , (data: NameValueModel[]) => ({ data })
);

export const getDeveloperCategoriesSuccess = createAction(
  GET_DEVELOPER_CATEGORIES_SUCCESS
  , (data: NameValueModel[]) => ({ data })
);

export const getDeveloperLanguagesSuccess = createAction(
  GET_DEVELOPER_LANGUAGES_SUCCESS
  , (data: NameValueModel[]) => ({ data })
);

export const getDeveloperSoftSkillsSuccess = createAction(
  GET_DEVELOPER_SOFT_SKILLS_SUCCESS
  , (data: NameValueModel[]) => ({ data })
);
