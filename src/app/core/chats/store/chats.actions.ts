import { createAction, props } from '@ngrx/store';
import { IConversation } from 'app/shared/models/conversation.model';
import { IConversationMessage } from 'app/shared/models';

// Common
export const updateConversationsList = createAction('[Chat] Update conversations list', props<{ userId: string }>());
export const updateConversationsListSuccess = createAction('[Chat] Update conversations list success', (convs: IConversation[]) => ({ convs }));
export const updateConversationsListError = createAction('[Chat] Update conversations list error', (err: any) => err);

// Conversations search
export const searchConversations = createAction('[Chat] Search conversations', props<{ userId: string, term: string }>());
export const searchConversationsSuccess = createAction('[Chat] Search conversations success', (convs: IConversation[]) => ({ convs }));
export const searchConversationsError = createAction('[Chat] Search conversations error', (err: any) => err);

// Load messages
export const getConverastionMessages = createAction('[Chat] Get conversation messages', props<{ convId: string, page: number, count: number }>());
export const getConverastionMessagesSuccess = createAction('[Chat] Get conversation messages success', (messages: IConversationMessage[]) => ({ messages }));
export const getConverastionMessageError = createAction('[Chat] Get conversation messages error', (err: any) => err);

// New message
export const addNewMessage = createAction('[Chat] Add new message', props<IConversationMessage>());

// Set/Cancel active chat
export const setActiveConversation = createAction('[Chat] Set active conversation', props<{ convId: string }>());
export const cancelActiveConversation = createAction('[Chat] Cancel active conversation');

// Online status
export const updateParticipantLastSeen = createAction('[Chat] Update participant last seen', props<{ userId: string, lastSeen: string }>());

// Create new conversation
export const createNewConversation = createAction('[Chat] Create new conversation success', props<{ conv: IConversation, open: boolean }>());
