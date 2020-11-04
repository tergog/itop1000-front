import { DevProperties } from 'app/shared/models/dev-properties.model';

export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  devProperties: DevProperties;
  location: string;
  dateUpdated: string;
  availability?: boolean;
}
