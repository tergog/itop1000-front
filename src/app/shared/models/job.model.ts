export interface Job {
  id: string;
  title: string;
  description: string;
  categories: string;
  requirements: string;
  duration: number;
  price: number;
  country: string;
  userId?: string;
  city: string;
  dateCreated: string;
  company: string;
}
