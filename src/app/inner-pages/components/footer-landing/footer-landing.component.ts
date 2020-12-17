import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-footer-landing',
  templateUrl: './footer-landing.component.html',
  styleUrls: ['./footer-landing.component.scss']
})
export class FooterLandingComponent implements OnInit, OnChanges {
  isLanding: boolean;
  @Input() url;

  constructor() {
  }
  


  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.url);
    if(this.url === "/landing" || this.url === "") {
      this.isLanding = true;
    } else {
      this.isLanding = false;
    }
    console.log(this.isLanding);
  }
}
