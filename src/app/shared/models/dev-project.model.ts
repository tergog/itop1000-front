import { NameValueModel } from 'app/shared/models';

export interface DevProject {
  title: string;
  description: string;
  technologies: NameValueModel[];
  link: string;
  logo?: string;
  images?: string[];
  from?: number;
  to?: number;
}
