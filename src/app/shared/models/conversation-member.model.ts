import { UserInfo } from './user-info.model';
import { EChatMemberStatus } from '../enums';

export interface IConversationMember {
  account: UserInfo;
  status: EChatMemberStatus;
  isNotification: boolean;
  isMarked: boolean;
}
