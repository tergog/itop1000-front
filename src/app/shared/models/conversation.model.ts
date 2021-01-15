import { ConversationMemberModel } from './conversation-member.model';

export interface ConversationModel {
  id: string;
  createdAt: string;
  participants: ConversationMemberModel[];
  unreadCount: number;
  type: string;
}
