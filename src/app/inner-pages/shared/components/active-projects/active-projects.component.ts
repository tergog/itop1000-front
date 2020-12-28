import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActiveProjectsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { map, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-active-projects',
  templateUrl: './active-projects.component.html',
  styleUrls: ['./active-projects.component.scss']
})
export class ActiveProjectsComponent implements OnInit {

  public activeProject;
  projects$;

  constructor(
    private projectService: ActiveProjectsService,
    private store: Store<fromCore.State>
    ) {
  }


  ngOnInit(): void {
    this.projects$ = this.store.select(fromCore.getUserInfo).pipe(
        map((user: UserInfo) => user.id),
        switchMap((id: string) => this.projectService.getActiveProjects(id))
      );


  }

  public onProjectClick(project): void {
    this.activeProject = project;
  }

  public onCancelButtonClick(): void {
    this.activeProject = false;
  }

}
