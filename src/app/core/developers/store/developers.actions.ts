import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Developer, Job } from 'app/shared/models';

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
