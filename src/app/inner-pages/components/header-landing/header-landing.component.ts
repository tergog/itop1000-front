import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
})
export class HeaderLandingComponent implements OnInit {
  isOpened: boolean;

  @Output() sideBarOpened = new EventEmitter<boolean>();

  constructor() {
    this.isOpened = false;
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.sideBarOpened.emit(this.isOpened);
  }
}
