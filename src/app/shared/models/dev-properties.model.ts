import { NameValueModel } from 'app/shared/models';
import { CategoriesAndSkills } from 'app/shared/models/categories-and-skills.model';

export interface DevProperties {
  categories?: CategoriesAndSkills[];
  skills?: CategoriesAndSkills[];
  softSkills?: NameValueModel[];
  languages?: NameValueModel[];
  description?: string;
  hourlyRate?: number;
  monthRate?: number;
  duration?: number;
  certificates?: string[];
}
