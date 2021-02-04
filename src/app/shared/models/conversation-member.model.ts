import { UserInfo } from './user-info.model';
import { EChatMemberStatus } from '../enums/chat-member-status.enum';

export interface ConversationMemberModel {
  user: UserInfo;
  status: EChatMemberStatus;
  isNotification: boolean;
  isMarked: boolean;
}
