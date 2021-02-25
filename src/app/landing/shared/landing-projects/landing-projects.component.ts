import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RecentProjects } from 'app/landing/landing-freelancer/landing-freelancer.component';
import { DemoProject } from 'app/landing/landing-client/landing-client.component';

@Component({
  selector: 'app-landing-projects',
  templateUrl: './landing-projects.component.html',
  styleUrls: ['./landing-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingProjectsComponent {

  @Input() type: 'companies' | 'projects';
  @Input() data: RecentProjects[] | DemoProject[];

  constructor() { }

}
