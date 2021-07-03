import { IConversationMember } from './conversation-member.model';
import { EConversationType } from '../enums';

export interface IConversation {
  _id: string;
  createdAt: string;
  participants: IConversationMember[];
  messages: {
    unread: number,
    total: number
  };
  type: EConversationType;
}
