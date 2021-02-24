import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GuideData } from 'app/landing/landing-client/landing-client.component';

@Component({
  selector: 'app-landing-guide',
  templateUrl: './landing-guide.component.html',
  styleUrls: ['./landing-guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingGuideComponent {

  @Input() data: GuideData[];

  constructor() { }

}
