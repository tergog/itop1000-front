import { ConversationMemberModel } from './conversation-member.model';

export interface ConversationModel {
  id: string;
  title: string;
  createdAt: string;
  participants: ConversationMemberModel[];
}
