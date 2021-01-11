import { Component, OnInit } from '@angular/core';

import { opacityInOutAnimation } from 'app/shared/animations';
import { animate, style, transition, trigger } from '@angular/animations';

export interface Mock {
  name: string;
  message: string;
  id: number;
}

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss'],
  animations: [ trigger('notification', [
    transition(':enter', [
      style({ opacity: 0, marginTop: '-51px' }),
      animate('300ms', style({ opacity: 1, marginTop: '10px' })),
    ]),
    transition(':leave', [
      animate('300ms', style({ opacity: 0, marginTop: '-51px' }))
    ])
  ])
  ]
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
