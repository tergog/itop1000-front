import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { State, getDeveloper } from 'app/core/developers';
import { DevProject } from 'app/shared/models/dev-project.model';
import { setDeveloper } from 'app/core/developers/developers.actions';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  public project: DevProject;
  public projectId: number;

  constructor(
    private store: Store<State>,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.store.select(getDeveloper).subscribe(developer => developer
      ? this.project = developer.devProperties.projects[this.projectId]
      : this.store.dispatch(setDeveloper({id: this.route.snapshot.params.id})));
  }

}
