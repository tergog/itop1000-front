import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing-description',
  templateUrl: './landing-description.component.html',
  styleUrls: ['./landing-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingDescriptionComponent {

  constructor() { }

}
