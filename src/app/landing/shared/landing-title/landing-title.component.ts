import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-title',
  templateUrl: './landing-title.component.html',
  styleUrls: ['./landing-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingTitleComponent {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() btnTitle: string;

  constructor() { }

}
