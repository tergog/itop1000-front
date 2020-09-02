import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Developer } from 'app/shared/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})

export class ProjectCardComponent implements OnInit {

  @Input() project;
  @Output() profile = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
