import { DevProperties } from 'app/shared/models/dev-properties.model';
import { Notification } from 'app/shared/models/notification2.model';
import { EUserRole } from 'app/shared/enums';

export interface UserInfo {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  dateCreated: string;
  phone: string;
  address: string;
  timezone: string;
  devProperties: DevProperties;
  photo: string;
  token?: string;
  notifications: Notification[];
  stripeAccountId: string;
  stripeVerified: boolean;
  balance: number;
}
