import { DevProperties } from 'app/shared/models/user-info.model';

export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  description: string;
  devProperties: DevProperties;
  hourlyRate: string;
  monthRate: string;
  location: string;
  dateUpdated: string;
  availability?: boolean;
  duration?: number;
}
