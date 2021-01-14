import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models';

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
