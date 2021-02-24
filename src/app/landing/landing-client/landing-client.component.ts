import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-client',
  templateUrl: './landing-client.component.html',
  styleUrls: ['./landing-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
