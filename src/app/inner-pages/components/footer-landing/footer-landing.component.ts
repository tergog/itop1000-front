import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer-landing',
  templateUrl: './footer-landing.component.html',
  styleUrls: ['./footer-landing.component.scss']
})
export class FooterLandingComponent implements OnInit {

  @ViewChild('client') client: RouterLinkActive;
  @ViewChild('freelancer') freelancer: RouterLinkActive;

  constructor() {
  }

  ngOnInit(): void {
  }
}
