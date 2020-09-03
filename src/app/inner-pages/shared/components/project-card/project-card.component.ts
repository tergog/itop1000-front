import { Component, OnInit, Input } from '@angular/core';

import { DevProjectModel } from 'app/shared/models/dev-project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})

export class ProjectCardComponent implements OnInit {

  @Input() project: DevProjectModel;

  constructor() { }

  ngOnInit(): void {
  }

}
