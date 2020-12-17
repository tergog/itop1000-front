import { Component, OnInit } from '@angular/core';
import { opacityInOutAnimation } from 'app/shared/animations';


@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
  animations: [opacityInOutAnimation]
})
export class HeaderLandingComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
    
  }

}
