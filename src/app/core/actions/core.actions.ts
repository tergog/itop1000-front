import { Action } from '@ngrx/store';

import { UserInfo } from 'app/shared/models';
import { DevProject } from 'app/shared/models/dev-project.model';

export const SAVE_TOKEN = '[Core] Saves user\'s auth token';

export const ON_LOGIN = '[Core] On login';
export const ON_LOGOUT = '[Core] On logout';

export const LOAD_USER_PROFILE = '[Core] Load user profile';
export const UPDATE_USER_PROFILE = '[Core] Update user profile';
export const UPDATE_PROJECT_IMAGE = '[Core] Update project image';

export const LOAD_PROJECTS = '[Core] Load projects';
export const LOAD_PROJECTS_SUCCESS = '[Core] load projects success';
export const LOAD_PROJECTS_ERROR = '[Core] load projects error';
export const UPDATE_PROJECT = '[Core] Update project';
export const ADD_PROJECT = '[Core] Add project';
export const DELETE_PROJECT = '[Core] Delete project';

export const UPDATE_PHOTO = '[Core] Update user photo';
export const DELETE_PHOTO = '[Core] Delete user photo';

export const ADD_CERTIFICATE = '[Core] Add certificate';
export const DELETE_CERTIFICATE = '[Core] Delete certificate';

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

export class LoadUserAction implements Action {
  readonly type = LOAD_USER_PROFILE;
}

export class UpdateUserProfileAction implements Action {
  readonly type = UPDATE_USER_PROFILE;
  constructor(public payload: UserInfo) {}
}

export class UpdatePhotoAction implements Action {
  readonly type = UPDATE_PHOTO;
  constructor(public payload: string) {
  }
}

export class DeletePhotoAction implements Action {
  readonly type = DELETE_PHOTO;
}

export class OnValidSessionAction implements Action {
  readonly type = ON_VALID_SESSION;
  constructor(public payload: boolean) {}
}

export class AddCertificateAction implements Action {
  readonly type = ADD_CERTIFICATE;
  constructor(public payload: string) {}
}

export class DeleteCertificateAction implements Action {
  readonly type = DELETE_CERTIFICATE;
  constructor(public payload: string) {}
}

export class UpdateProjectImageAction implements Action {
  readonly type = UPDATE_PROJECT_IMAGE;
  constructor(public image: string, public id: number) {}
}

export class LoadProjectsAction implements Action {
  readonly type = LOAD_PROJECTS;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = LOAD_PROJECTS_SUCCESS;
  constructor(public payload: DevProject[]) {
  }
}

export class UpdateProjectAction implements Action {
  readonly type = UPDATE_PROJECT;
  constructor(public payload: DevProject, public id: number) {
  }
}

export class LoadProjectsErrorAction implements Action {
  readonly type = LOAD_PROJECTS_ERROR;
}

export class AddProjectAction implements Action {
  readonly type = ADD_PROJECT;
  constructor(public payload: DevProject) {
  }
}

export class DeleteProjectAction implements Action {
  readonly type = DELETE_PROJECT;
  constructor(public payload: string) {
  }
}

/**
 * Exports possible core action types
 */
export type Actions =
  | LoadUserAction
  | SaveTokenAction
  | SetOnLoginAction
  | SetOnLogoutAction
  | UpdateUserProfileAction
  | OnValidSessionAction
  | UpdateProjectImageAction
  | AddCertificateAction
  | DeleteCertificateAction
  | UpdatePhotoAction
  | DeletePhotoAction
  | LoadProjectsAction
  | LoadProjectsSuccessAction
  | LoadProjectsErrorAction
  | UpdateProjectAction
  | AddProjectAction
  | DeleteProjectAction;
