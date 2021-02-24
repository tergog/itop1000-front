import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Developer } from 'app/landing/landing-client/landing-client.component';

@Component({
  selector: 'app-landing-top',
  templateUrl: './landing-top.component.html',
  styleUrls: ['./landing-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingTopComponent {

  @Input() type: 'companies' | 'developers';
  @Input() data: string[] | Developer[];

  constructor() { }

}
