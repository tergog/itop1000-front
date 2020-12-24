import { Job } from 'app/shared/models';
import * as Actions from './actions';

export interface State {
    jobs: Job[];
}
  
export const INIT_STATE: State = {
    jobs: []
};

export function reducer(state: State = INIT_STATE, action: Actions.Actions) {
    switch (action.type) {
      case Actions.GET_JOBS_SUCCESS:
        return { jobs: action.payload };
      default:
        return state;
    }
}

export const getJobs = (state: State): Job[] => state.jobs;