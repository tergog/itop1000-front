import { ConversationMemberModel } from './conversation-member.model';

export interface ConversationMessageModel {
  chat: string;
  message: string;
  sender: ConversationMemberModel;
  isRead?: boolean;
  date?: string;
}
