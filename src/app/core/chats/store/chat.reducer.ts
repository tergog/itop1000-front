import { createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { IConversation } from 'app/shared/models/conversation.model';
import { IConversationMessage } from 'app/shared/models';
import * as actions from './chats.actions';

export interface State {
  conversations: {
    data: IConversation[];
    loading: boolean;
    error: HttpErrorResponse;
    active: string;
  };
  messages: {
    data: IConversationMessage[];
    loading: boolean;
    error: HttpErrorResponse;
  }
}

const INIT_STATE: State = {
  conversations: {
    data: [],
    loading: false,
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
  on(actions.updateConversationsList, (state) => ({
    ...state,
    conversations: {
      ...state.conversations,
      loading: true
    }
  })),
  on(actions.updateConversationsListSuccess, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      data: payload.convs,
      loading: false
    }
  })),
  on(actions.updateConversationsListError, (state, err) => ({
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
      data: payload.messages.concat(state.messages.data),
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
      active: payload.convId
    },
    messages: {
      ...state.messages,
      data: []
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
  })),

  // Online status
  on(actions.updateParticipantLastSeen, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      data: state.conversations.data.map((conv) => ({
        ...conv,
        participants: conv.participants.map((part) => {
          return (part.user.id === payload.userId) ? {
            ...part,
            user: {
              ...part.user,
              lastSeen: payload.lastSeen
            }
          } : part;
        })
      }))
    }
  })),

  // Create new conversation
  on(actions.createNewConversation, (state, payload) => ({
    ...state,
    conversations: {
      ...state.conversations,
      data: state.conversations.data.concat(payload.conv),
      active: payload.open ? payload.conv[0].id : null
    }
  }))
);

export const getChats = (state: State): State => state;
