import { DevProperties } from 'app/shared/models/dev-properties.model';

export interface Developer {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  devProperties: DevProperties;
  address: string;
  dateUpdated: string;
  availability?: boolean;
}
