import { createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ConversationModel } from 'app/shared/models/conversation.model';
import { ConversationMessageModel } from 'app/shared/models';
import * as actions from './chats.actions';

export interface State {
  conversations: {
    data: ConversationModel[];
    loading: boolean;
    search: boolean;
    error: HttpErrorResponse;
    active: string;
  };
  messages: {
    data: ConversationMessageModel[];
    loading: boolean;
    error: HttpErrorResponse;
  }
}

const INIT_STATE: State = {
  conversations: {
    data: [],
    loading: false,
    search: false,
    error: null,
    active: null
  },
  messages: {
    data: [],
    loading: false,
    error: null
  }
};

export const reducer = createReducer(
  INIT_STATE,

  // Common
  on(actions.getConversationsByUserId, (state) => ({
    ...state,
    conversations: {
      ...state.conversations,
      loading: true
    }
  })),
  on(actions.getConversationsByUserIdSuccess, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      data: payload.convs,
      loading: false
    }
  })),
  on(actions.getConversationsByUserIdError, (state, err) => ({
    ...state,
    conversations: {
      ...state.conversations,
      error: err,
      loading: false
    }
  })),


  // Conversations search
  on(actions.searchConversations, (state) => ({
    ...state,
    conversations: {
      ...state.conversations,
      search: true,
      loading: true
    }
  })),
  on(actions.searchConversationsSuccess, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      data: payload.convs,
      loading: false
    }
  })),
  on(actions.searchConversationsError, (state, err) => ({
    ...state,
    conversations: {
      ...state.conversations,
      error: err,
      loading: false
    }
  })),
  on(actions.searchConversationsCancel, (state) => ({
    ...state,
    conversations: {
      ...state.conversations,
      search: false
    }
  })),


  // Load messages
  on(actions.getConverastionMessages, (state) => ({
    ...state,
    messages: {
      ...state.messages,
      loading: true
    }
  })),
  on(actions.getConverastionMessagesSuccess, (state, payload) => ({
    ...state,
    messages: {
      ...state.messages,
      data: payload.messages,
      loading: false
    }
  })),
  on(actions.getConverastionMessageError, (state, err) => ({
    ...state,
    messages: {
      ...state.messages,
      loading: false,
      error: err
    }
  })),

  // New message
  on(actions.addNewMessage, (state, payload) => ({
    ...state,
    messages: {
      ...state.messages,
      data: [
        ...state.messages.data,
        payload
      ]
    }
  })),

  // Set/Cancel active chat
  on(actions.setActiveConversation, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      active: payload.id
    }
  })),
  on(actions.cancelActiveConversation, (state) => ({
    ...state,
    conversations: {
      ...state.conversations,
      active: null
    },
    messages: {
      ...state.messages,
      data: []
    }
  }))
);

export const getChats = (state: State): State => state;
