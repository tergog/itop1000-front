import { DevProperties } from 'app/shared/models/dev-properties.model';

export interface UserInfo {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateCreated: string;
  phone: string;
  address: string;
  timezone: string;
  devProperties: DevProperties;
  photo: string;
  token?: string;
  lastSeen: string;
}

