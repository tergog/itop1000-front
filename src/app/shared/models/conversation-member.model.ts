import { UserInfo } from './user-info.model';
import { EChatMemberStatus } from '../enums';

export interface IConversationMember {
  user: UserInfo;
  status: EChatMemberStatus;
  isNotification: boolean;
  isMarked: boolean;
}
