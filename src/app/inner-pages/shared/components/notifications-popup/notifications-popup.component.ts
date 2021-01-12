import { Component, OnInit } from '@angular/core';

import { marginAnimation } from 'app/shared/animations/margin.animation';

export interface Mock {
  name: string;
  message: string;
  id: number;
}

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss'],
  animations: [marginAnimation]
})

export class NotificationsPopupComponent implements OnInit {

  mockData: Mock[] = [
    {
      name: 'Boris Stelman',
      message: 'At vero eds et accusamus et iusto',
      id: 1
    },
    {
      name: 'Boris Stelman',
      message: 'At vero eds et accusamus et iusto',
      id: 2
    },
    {
      name: 'Boris Stelman',
      message: 'At vero eds et accusamus et iusto',
      id: 3
    },
    {
      name: 'Boris Stelman',
      message: 'At vero eds et accusamus et iusto',
      id: 4
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  delete(id: number): void {
    this.mockData = this.mockData.filter(el => el.id !== id);
  }

}
