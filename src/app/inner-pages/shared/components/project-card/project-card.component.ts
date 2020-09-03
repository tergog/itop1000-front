import { Component, OnInit, Input } from '@angular/core';

import { DevProject } from 'app/shared/models/dev-project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})

export class ProjectCardComponent implements OnInit {

  @Input() project: DevProject;

  constructor() { }

  ngOnInit(): void {
  }

}
