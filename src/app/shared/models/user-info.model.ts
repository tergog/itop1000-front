import { NameValueModel } from 'app/shared/models';

export interface UserInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateCreated: string;
  phone: string;
  address: string;
  timezone: string;
  categories: NameValueModel[];
  skills: NameValueModel[];
  photo: string;
  token?: string;
}
