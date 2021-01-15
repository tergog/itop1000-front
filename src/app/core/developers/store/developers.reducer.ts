import * as actions from './developers.actions';
import { createReducer, on } from '@ngrx/store';

import { Developer, Job } from 'app/shared/models';

export const developers = [
    {
      id: '1',
      firstName: 'Yevhen',
      lastName: 'Hohol',
      title: 'Angular Developer',
      availability: true,
      email: 'qwer@qwe.re',
      phone: '+380987612345',
      devProperties: {
        skills: [
          {
            name : 'Typescript',
            value : 2
          },
          {
            name : 'Javascript',
            value : 1
          },
          {
            name : 'HTML5',
            value : 5
          },
          {
            name : 'Angular',
            value : 2
          },
          {
            name : 'Angular 10',
            value : 1
          },
          {
            name : 'CSS3',
            value : 5
          }
        ],
        softSkills: [
          {
            name: 'Creativity',
            value: 60,
          },
          {
            name: 'Mentoring',
            value: 30,
          },
          {
            name: 'Communication',
            value: 85,
          },
          {
            name: 'Lorem lorem',
            value: 10,
          },
        ],
        languages: [
          {
            name: 'Russian',
            value: 6,
          },
          {
            name: 'English',
            value: 5,
          },
          {
            name: 'French',
            value: 3,
          },
          {
            name: 'Italian',
            value: 4,
          },
        ],
        projects: [
          {
            title: 'Project 1 title',
            description: 'Project 1 description lorem ipsum dolor sit amet',
            technologies: [
              {
                name : 'Javascript',
                value : 1
              },
              {
                name : 'HTML5',
                value : 5
              },
              {
                name : 'Angular',
                value : 2
              },
            ],
            link: 'https://github.com/',
            logo: null,
            images: [],
            from: null,
            to: null
          },
          {
            title: 'Project 2 title',
            description: 'Project 2 description lorem ipsum dolor sit amet',
            technologies: [
              {
                name : 'Javascript',
                value : 1
              },
              {
                name : 'CSS3',
                value : 5
              },
              {
                name : 'Angular',
                value : 2
              },
            ],
            link: 'https://github.com/',
            logo: null,
            images: [],
            from: null,
            to: null
          }
        ],
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame...',
        hourlyRate: 100,
        monthRate: 20000,
        duration: 12,
      },
      address: 'Ukraine, Kyiv',
      dateUpdated: '19 July 2020',
      photo : 'http://localhost:4000/1594974664857.png'
    }
  ];

export interface State {
  developers: Developer[];
  developer: Developer;
  jobs: Job[];
  loading: boolean;
  error: boolean;
}

const INIT_STATE: State = {
  developers: [],
  developer: null, // developers[0]
  jobs: [],
  loading: false,
  error: false
};

export const reducer = createReducer(
  INIT_STATE,
  on(
    actions.searchDevelopers,
    (state) => {
      return {
        ...state,
        loading: true
      }
    }
  ),
  on(
    actions.searchDevelopersSuccess,
    (state, {developersList}) => ({
      ...state,
      developers: developersList,
      loading: false
    })
  ),
  on(
    actions.searchDevelopersError,
    (state) => {
      return {
        ...state,
        error: true,
        loading: false
      }
    }
  ),
  on(
    actions.updateDeveloper,
    (state, {id}) => {
      const developerById: Developer = state.developers.find((dev: Developer) => dev.id === id);
      return {
        ...state,
        developer: developerById
      };
    }
  ),
  on(
    actions.searchJobsSuccess,
    (state, payload) => {
      return {
        ...state,
        jobs: payload.jobs,
        loading: false
      }
    }
  ),
  on(
    actions.searchJobs,
    (state) => {
      return {
        ...state,
        loading: true
      }
    }
  ),
  on(
    actions.searchJobsError,
    (state) => {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
  ),
  on(
    actions.setDeveloperSuccess,
    (state, {developer}) => ({
      ...state,
      developer: {...developer}
    })
  ),
  on(
    actions.setDeveloperError,
    (state) => {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
  )
);

/** Selector return is Authenticated */
export const getDevelopers = (state: State): Developer[] => {
  return state.developers;
};
export const getJobs = (state: State): Job[] => {
  return state.jobs;
};
export const getDeveloper = (state: State): Developer => {
  return state.developer;
};
export const getLoading = (state: State): boolean => {
  return state.loading;
};
