import { IConversationMember } from './conversation-member.model';

export interface IConversationMessage {
  chat: string;
  message: string;
  sender: IConversationMember;
  isRead?: boolean;
  date?: string;
}
