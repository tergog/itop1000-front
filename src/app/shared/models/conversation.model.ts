import { ConversationMemberModel } from './conversation-member.model';

export interface ConversationModel {
  id: string;
  createdAt: string;
  participants: ConversationMemberModel[];
  messages: {
    unread: number,
    total: number
  };
  type: string;
}
