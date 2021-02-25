import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-benefits',
  templateUrl: './landing-benefits.component.html',
  styleUrls: ['./landing-benefits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingBenefitsComponent {

  @Input() type: 'client' | 'freelancer';

  constructor() { }

}
