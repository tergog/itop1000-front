import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models/name-value.model';

export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  description: string;
  skills: NameValueModel[];
  softSkills: NameValueModel[];
  languages: NameValueModel[];
  projects: DevProject[];
  hourlyRate: string;
  monthRate: string;
  location: string;
  dateUpdated: string;
  availability?: boolean;
  duration?: number;
}
