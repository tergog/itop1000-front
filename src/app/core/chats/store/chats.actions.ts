import { createAction, props } from '@ngrx/store';
import { ConversationModel } from 'app/shared/models/conversation.model';
import { ConversationMessageModel } from 'app/shared/models';

// Common
export const GET_CONVS_BY_USER_ID = '[Chat] Get all conversation by user id';
export const GET_CONVS_BY_USER_ID_SUCCESS = '[Chat] Get all conversation by user id success';
export const GET_CONVS_BY_USER_ID_ERROR = '[Chat] Get all conversation by user id error';

export const getConversationsByUserId = createAction(GET_CONVS_BY_USER_ID, props<{ id: string, openWith: string }>());
export const getConversationsByUserIdSuccess = createAction(GET_CONVS_BY_USER_ID_SUCCESS, (convs: ConversationModel[]) => ({ convs }));
export const getConversationsByUserIdError = createAction(GET_CONVS_BY_USER_ID_ERROR, (err: any) => err);

// Conversations search
export const SEARCH_CONVS = '[Chat] Search conversations';
export const SEARCH_CONVS_SUCCESS = '[Chat] Search conversations success';
export const SEARCH_CONVS_ERROR = '[Chat] Search conversations error';
export const SEARCH_CONVS_CANCEL = '[Chat] Search conversation cancel';

export const searchConversations = createAction(SEARCH_CONVS, props<{ id: string, search: string }>());
export const searchConversationsSuccess = createAction(SEARCH_CONVS_SUCCESS, (convs: ConversationModel[]) => ({ convs }));
export const searchConversationsError = createAction(SEARCH_CONVS_ERROR, (err: any) => err);
export const searchConversationsCancel = createAction(SEARCH_CONVS_CANCEL);

// Load messages
export const GET_CONVS_MESSAGES = '[Chat] Get conversation messages';
export const GET_CONVS_MESSAGES_SUCCESS = '[Chat] Get conversation messages success';
export const GET_CONVS_MESSAGES_ERROR = '[Chat] Get conversation messages error';

export const getConverastionMessages = createAction(GET_CONVS_MESSAGES, props<{ id: string, count: number }>());
export const getConverastionMessagesSuccess = createAction(GET_CONVS_MESSAGES_SUCCESS, (messages: ConversationMessageModel[]) => ({ messages }));
export const getConverastionMessageError = createAction(GET_CONVS_MESSAGES_ERROR, (err: any) => err);

// New message
export const ADD_NEW_MESSAGE = '[Chat] Add new message';

export const addNewMessage = createAction(ADD_NEW_MESSAGE, props<ConversationMessageModel>());

// Set/Cancel active chat
export const SET_ACTIVE_CONV = '[Chat] Set active conversation';
export const CANCEL_ACTIVE_CONV = '[Chat] Cancel active conversation';

export const setActiveConversation = createAction(SET_ACTIVE_CONV, props<{ id: string }>());
export const cancelActiveConversation = createAction(CANCEL_ACTIVE_CONV);

// Online status
export const UPDATE_PARTICIPANT_LAST_SEEN = '[Chat] Update participant last seen';

export const updateParticipantLastSeen = createAction(UPDATE_PARTICIPANT_LAST_SEEN, props<{ userId: string, lastSeen: string }>());
