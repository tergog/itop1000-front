import * as actions from './developers.actions';

import { Developer } from 'app/shared/models';
import { createReducer, on } from '@ngrx/store';

export const developers = [
    {
      id: '1',
      firstName: 'Yevhen',
      lastName: 'Hohol',
      title: 'Angular Developer',
      availability: true,
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
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame...',
        hourlyRate: 100,
        monthRate: 20000,
        duration: 12,
      },
      location: 'Ukraine, Kyiv',
      dateUpdated: '19 July 2020',
      photo : 'http://localhost:4000/1594974664857.png'
    }
  ];

export interface State {
  developers: Developer[];
  developer: Developer;
}

const INIT_STATE: State = {
  developers,
  developer: developers[0]
};

export const reducer = createReducer(
  INIT_STATE,
  on(
    actions.searchDevelopers,
    state => ({...state})
  ),
  on(
    actions.searchDevelopersSuccess,
    (state, {developersList}) => ({
      ...state,
      developers: developersList
    })
  ),
  on(
    actions.setDeveloper,
    (state, {id}) => {
      const developerById: Developer = state.developers.find((dev: Developer) => dev.id === id);
      return {
        ...state,
        developer: developerById
      };
    }
  )
);

/** Selector return is Authenticated */
export const getDevelopers = (state: State): Developer[] => state.developers;
export const getDeveloper = (state: State): Developer => state.developer;
