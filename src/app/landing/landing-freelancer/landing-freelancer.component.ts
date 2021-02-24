import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-freelancer',
  templateUrl: './landing-freelancer.component.html',
  styleUrls: ['./landing-freelancer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingFreelancerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
