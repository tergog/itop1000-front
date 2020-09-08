import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models';

export interface DevProperties {
  categories?: NameValueModel[];
  skills?: NameValueModel[];
  softSkills?: NameValueModel[];
  languages?: NameValueModel[];
  projects?: DevProject[];
}

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
  devProperties: DevProperties;
  photo: string;
  token?: string;
}

