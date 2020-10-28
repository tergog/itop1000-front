import * as coreActions from '../actions/core.actions';

import { Developer, Job, UserInfo } from 'app/shared/models';

export const developers = [
    {
      id: '1',
      firstName: 'Yevhen',
      lastName: 'Hohol',
      hourlyRate: '40',
      monthRate: '2500',
      title: 'Angular Developer',
      availability: true,
      description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame...',
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
            link: 'https://github.com/'
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
            link: 'https://github.com/'
          }
        ],
      },
      location: 'Ukraine, Kyiv',
      dateUpdated: '19 July 2020',
      photo : 'http://localhost:4000/1594974664857.png'
    }
  ];

export interface State {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  jobs: Job[];
  developers: Developer[];
  developer: Developer;
}

export const INIT_STATE: State = {
  isAuthenticated: null,
  userInfo: null,
  jobs: [],
  developers,
  developer: developers[0]
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
    case coreActions.SEARCH_JOBS_SUCCESS:
      return { ...state, jobs: action.payload };
    case coreActions.SEARCH_DEVELOPERS_SUCCESS:
      return { ...state, developers };
    default:
      return state;
  }
}

/** Selector return is Authenticated */
export const getIsAuthenticatedSelector = (state: State): boolean => state.isAuthenticated;
export const getUserInfoSelector = (state: State): UserInfo => state.userInfo;
export const getJobs = (state: State): Job[] => state.jobs;
export const getDevelopers = (state: State): Developer[] => state.developers;
export const getDeveloper = (state: State): Developer => state.developer;
