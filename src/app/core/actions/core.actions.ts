import { Action, createAction, props } from '@ngrx/store';

import { Job, UserInfo } from 'app/shared/models';

export const SAVE_TOKEN = '[Core] Saves user\'s auth token';

export const ON_LOGIN = '[Core] On login';
export const ON_LOGOUT = '[Core] On logout';

export const UPDATE_USER_PROFILE = '[Core] Update user profile';
export const UPDATE_PROJECT_IMAGE = '[Core] Update project image';

export const SEARCH_JOBS = '[Core] Search jobs';
export const SEARCH_JOBS_SUCCESS = '[Core] Search jobs success';

export const ON_VALID_SESSION = '[Core] On valid session';

/**
 * Save token to local storage
 */
export class SaveTokenAction implements Action {
  readonly type = SAVE_TOKEN;
  constructor(public payload: string) {}
}

export class SetOnLoginAction implements Action {
  readonly type = ON_LOGIN;
  constructor(public payload: UserInfo) {}
}

export class SetOnLogoutAction implements Action {
  readonly type = ON_LOGOUT;
}

export class UpdateUserProfileAction implements Action {
  readonly type = UPDATE_USER_PROFILE;
  constructor(public payload: UserInfo) {}
}

export class OnValidSessionAction implements Action {
  readonly type = ON_VALID_SESSION;
  constructor(public payload: boolean) {}
}

export class SearchJobsAction implements Action {
  readonly type = SEARCH_JOBS;
  constructor(public payload: string) {}
}

export class SearchJobsSuccessAction implements Action {
  readonly type = SEARCH_JOBS_SUCCESS;
  constructor(public payload: Job[]) {}
}

export class UpdateProjectImageAction implements Action {
  readonly type = UPDATE_PROJECT_IMAGE;
  constructor(public image: string, public id: number) {}
}

/**
 * Exports possible core action types
 */
export type Actions =
  | SaveTokenAction
  | SetOnLoginAction
  | SetOnLogoutAction
  | UpdateUserProfileAction
  | OnValidSessionAction
  | SearchJobsAction
  | SearchJobsSuccessAction
  | UpdateProjectImageAction;
