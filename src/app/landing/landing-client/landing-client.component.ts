import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface GuideData {
  title: string;
  description: string;
}

export interface Developer {
  name: string;
  surname: string;
  price: number;
}

export interface DemoProject {
  companyName: string;
  date: string;
}

@Component({
  selector: 'app-landing-client',
  templateUrl: './landing-client.component.html',
  styleUrls: ['./landing-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingClientComponent {

  public guideData: GuideData[] = [
    {
      title: 'Post your project',
      description: 'Create a task with proper description and specific details.'
    },
    {
      title: 'Review Bids',
      description: 'Go through bids from various freelancers matching the job description.'
    },
    {
      title: 'Work with preferred talent',
      description: 'Choose the freelancer that suits you best and start working with them.'
    }
  ];

  public developers: Developer[] = [
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    },
    {
      name: 'name',
      surname: 'surname',
      price: 40
    }
  ];

  public demoProjects: DemoProject[] = [
    {
      companyName: 'company name',
      date: '28 March'
    },
    {
      companyName: 'company name',
      date: '28 March'
    },
    {
      companyName: 'company name',
      date: '28 March'
    },
  ];

  constructor() { }

}
