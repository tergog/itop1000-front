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
        return  { ...state, error: true, loading: false };
      default:
        return state;
    }
}

export const getJobs = (state: State): Job[] => state.jobs;