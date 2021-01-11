import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

export interface NotificationMessage {
  message: string;
  type: ENotificationStatus;
}
