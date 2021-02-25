import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuideData } from 'app/landing/landing-client/landing-client.component';

export interface RecentProjects {
  projectName: string;
  companyName: string;
  budget: number;
}

@Component({
  selector: 'app-landing-freelancer',
  templateUrl: './landing-freelancer.component.html',
  styleUrls: ['./landing-freelancer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingFreelancerComponent {

  public guideData: GuideData[] = [
    {
      title: 'Create a profile',
      description: 'Sign up on our platform and create a detailed profile'
    },
    {
      title: 'Search for projects',
      description: 'Go through current projects and choose the one that suits your skill.'
    },
    {
      title: 'Send an offer',
      description: ' Submit a well-crafted offer to stand a chance of winning the gig.'
    },
    {
      title: 'Provide Quality Services',
      description: 'Work on the project and deliver results within the deadline.'
    },
    {
      title: 'Earn your money',
      description: 'Get paid for your services with your preferred payment, option.'
    }
  ];

  public companies = [
    'project name',
    'project name',
    'project name',
    'project name',
    'project name',
    'project name',
    'project name'
  ];

  public recentProjects: RecentProjects[] = [
    {
      projectName: 'project name',
      companyName: 'company name',
      budget: 100
    },
    {
      projectName: 'project name',
      companyName: 'company name',
      budget: 100
    },
    {
      projectName: 'project name',
      companyName: 'company name',
      budget: 100
    }
  ];

  constructor() { }

}
