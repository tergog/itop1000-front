import { NameValueModel } from 'app/shared/models/name-value.model';

export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  description: string;
  skills: NameValueModel[];
  hourlyRate: string;
  monthRate: string;
  location: string;
  dateUpdated: string;
  availability?: boolean;
  duration?: number;
}
