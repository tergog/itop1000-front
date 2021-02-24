import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface GuideData {
  title: string;
  description: string;
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

  constructor() { }

}
