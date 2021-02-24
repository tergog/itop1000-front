import { Job } from 'app/shared/models';
import * as Actions from './actions';

export interface State {
    jobs: Job[];
    loading: boolean;
    error: boolean;
}

export const INIT_STATE: State = {
    jobs: [],
    loading: false,
    error: false,
};

export function reducer(state: State = INIT_STATE, action: Actions.Actions) {
    switch (action.type) {
      case Actions.GET_JOBS:
        return { ...state, loading: true };
      case Actions.GET_JOBS_SUCCESS:
        return { ...state, jobs: action.payload, loading: false };
      case Actions.GET_JOBS_FAIL:
        return { ...state, error: true, loading: false };
      case Actions.UPDATE_JOB:
        const index = state.jobs.findIndex(el => el.id === action.payload.id);
        const newArr = [...state.jobs];
        newArr[index] = action.payload;
        return {
          ...state,
          jobs: newArr
        };
      case Actions.DELETE_JOB:
        return {
          ...state,
          jobs: state.jobs.filter(el => el.id !== action.payload)
        };
      default:
        return state;
    }
}

export const getJobs = (state: State): Job[] => state.jobs;
export const getLoading = (state: State): boolean => state.loading;
