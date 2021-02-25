import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing-separator',
  templateUrl: './landing-separator.component.html',
  styleUrls: ['./landing-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSeparatorComponent {

  constructor() { }

}
