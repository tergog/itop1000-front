import { Action } from '@ngrx/store';

import { Job } from 'app/shared/models';

export const GET_JOBS = '[Client] Get jobs';
export const GET_JOBS_SUCCESS = '[Client] Get jobs success';

export class GetJobsAction implements Action {
    readonly type = GET_JOBS;
    constructor(public payload: void) {}
}
  
export class GetJobsSuccessAction implements Action {
    readonly type = GET_JOBS_SUCCESS;
    constructor(public payload: Job[]) {}
}

export type Actions =
  | GetJobsAction
  | GetJobsSuccessAction;