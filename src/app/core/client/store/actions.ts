import { Action } from '@ngrx/store';

import { Job } from 'app/shared/models';

export const GET_JOBS = '[Client] Get jobs';
export const GET_JOBS_SUCCESS = '[Client] Get jobs success';
export const GET_JOBS_FAIL = '[Client] Get jobs fail';

export class GetJobsAction implements Action {
    readonly type = GET_JOBS;
}
  
export class GetJobsSuccessAction implements Action {
    readonly type = GET_JOBS_SUCCESS;
    constructor(public payload: Job[]) {}
}

export class GetJobsFailAction implements Action {
    readonly type = GET_JOBS_FAIL;
    constructor(public payload) {}
}
export type Actions =
  | GetJobsAction
  | GetJobsSuccessAction
  | GetJobsFailAction;