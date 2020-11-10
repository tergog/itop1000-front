import * as coreActions from '../actions/core.actions';

import { Job, UserInfo } from 'app/shared/models';

export interface State {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  jobs: Job[];
}

export const INIT_STATE: State = {
  isAuthenticated: null,
  userInfo: null,
  jobs: [],
};

/**
 * Exports reducing function
 */
export function reducer(state: State = INIT_STATE, action: coreActions.Actions) {
  switch (action.type) {
    case coreActions.ON_LOGIN:
      return { ...state, userInfo: action.payload, isAuthenticated: true };
    case coreActions.ON_LOGOUT:
      return { ...state, userInfo: null, isAuthenticated: false };
    case coreActions.UPDATE_USER_PROFILE:
      return {...state, userInfo: action.payload};
    case coreActions.ON_VALID_SESSION:
      return { ...state, isAuthenticated: action.payload };
    case coreActions.UPDATE_PROJECT_IMAGE:
      const account = {
        ...state.userInfo,
        devProperties: {
          ...state.userInfo.devProperties,
          projects: [
            ...state.userInfo.devProperties.projects
            .map((obj, index) =>  index === action.id ? {...obj, photo: action.image} : obj)]}};
      return {...state, userInfo: account};
    default:
      return state;
  }
}

/** Selector return is Authenticated */
export const getIsAuthenticatedSelector = (state: State): boolean => state.isAuthenticated;
export const getUserInfoSelector = (state: State): UserInfo => state.userInfo;
export const getJobs = (state: State): Job[] => state.jobs;
