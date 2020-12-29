import { NameValueModel } from 'app/shared/models/name-value.model'

export interface Job {
  id: string;
  title: string;
  description: string;
  categories: NameValueModel[];
  requirements: string;
  duration: number;
  contractType: string;
  price: number;
  address: string;
  userId?: string;
  dateCreated: string;
  company: string;
}
