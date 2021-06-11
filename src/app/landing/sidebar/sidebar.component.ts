import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() status: boolean;

  opened: boolean = false;

  constructor() {}

  ngOnInit(): void {};

  ngOnChanges(changes: SimpleChanges): void {
    this.opened = this.status
  }
}
