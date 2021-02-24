import { NameValueModel } from 'app/shared/models';

export interface DevProperties {
  categories?: NameValueModel[];
  skills?: NameValueModel[];
  softSkills?: NameValueModel[];
  languages?: NameValueModel[];
  description?: string;
  hourlyRate?: number;
  monthRate?: number;
  duration?: number;
  certificates?: string[];
}
