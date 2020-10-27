import { Component, Input, OnInit } from '@angular/core';

import { Job } from 'app/shared/models';

@Component({
  selector: 'app-job',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }
}
