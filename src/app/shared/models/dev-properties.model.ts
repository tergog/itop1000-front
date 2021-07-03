import { NameValueModel } from 'app/shared/models';
import { DevProject } from './dev-project.model';

export interface DevProperties {
  categories?: NameValueModel[];
  skills?: NameValueModel[];
  softSkills?: NameValueModel[];
  languages?: NameValueModel[];
  projects?: DevProject[];
  description?: string;
  hourlyRate?: number;
  monthRate?: number;
  duration?: number;
  certificates?: string[];
}
