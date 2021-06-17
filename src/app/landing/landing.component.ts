import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {

  sidebarStatus: boolean;

  constructor() {
    this.sidebarStatus = false;
  }

  changed(status: boolean): void {
    this.sidebarStatus = status;
  }
}
