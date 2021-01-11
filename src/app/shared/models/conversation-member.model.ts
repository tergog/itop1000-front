import { UserInfo } from './user-info.model';

export interface ConversationMemberModel {
  user: UserInfo;
  isNotification: boolean;
  isMarked: boolean;
}
