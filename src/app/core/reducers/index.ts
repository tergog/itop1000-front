import { Params } from '@angular/router';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

// Imports from reducers
import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as fromClient from 'app/core/client/store/reducer'
import * as fromCore from 'app/core/reducers/core.reducer';
import { environment } from 'environments/environment';

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];

/**
 * Top level state declaration
 */
export interface State {
  core: fromCore.State;
  client: fromClient.State;
  chat: fromChats.State;
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

// Map of the reducers
export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  client: fromClient.reducer,
  chat: fromChats.reducer
};

/**
 * Selectors returns smaller piece of state out of the root state
 */
export const getCoreState = (state: State) => state.core;
export const getClientState = (state: State) => state.client;
export const getChatsState = (state: State) => state.chat;

/**
 * Selectors from Core module
 */
export const getIsAuthenticated = createSelector(
    getCoreState,
    fromCore.getIsAuthenticatedSelector
);

export const getUserInfo = createSelector(
    getCoreState,
    fromCore.getUserInfoSelector
);

export const getJobs = createSelector(
  getClientState,
  fromClient.getJobs
);

export const getChats = createSelector(
  getChatsState,
  fromChats.getChats
);
