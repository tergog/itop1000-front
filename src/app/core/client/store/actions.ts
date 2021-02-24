import { Action } from '@ngrx/store';

import { Job } from 'app/shared/models';

export const GET_JOBS = '[Client] Get jobs';
export const GET_JOBS_SUCCESS = '[Client] Get jobs success';
export const GET_JOBS_FAIL = '[Client] Get jobs fail';
export const UPDATE_JOB = '[Client] Update job';
export const DELETE_JOB = '[Client] Delete job';

export class GetJobsAction implements Action {
    readonly type = GET_JOBS;
}

export class GetJobsSuccessAction implements Action {
    readonly type = GET_JOBS_SUCCESS;
    constructor(public payload: Job[]) {}
}

export class UpdateJobAction implements Action {
  readonly type = UPDATE_JOB;
  constructor(public payload: Job) {}
}

export class DeleteJobAction implements Action {
  readonly type = DELETE_JOB;
  constructor(public payload: string) {}
}

export class GetJobsFailAction implements Action {
    readonly type = GET_JOBS_FAIL;
    constructor(public payload: any) {}
}
export type Actions =
  | GetJobsAction
  | GetJobsSuccessAction
  | GetJobsFailAction
  | UpdateJobAction
  | DeleteJobAction;
