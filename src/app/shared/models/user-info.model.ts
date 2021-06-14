import { DevProperties } from 'app/shared/models/dev-properties.model';
import { Notification } from 'app/shared/models/notification2.model';
import { EUserRole } from 'app/shared/enums';
import { Job } from './job.model';

export interface UserInfo {
  id: string;
  title: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  devProperties: DevProperties;
  projectApplications: Job[];
  stripeAccountId: string;
  stripeVerified: boolean;
  role: EUserRole;
  dateCreated: string;
  phone: string;
  address: string;
  timezone: string;
  photo: string;
  token?: string;
  notifications: Notification[];
  balance: number;
  lastSeen: string;
  projects: [];
}
