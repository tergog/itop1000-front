import { Store } from '@ngrx/store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import { ActiveProject, UserInfo } from 'app/shared/models';
import { ActiveProjectsService } from 'app/shared/services';

@Component({
  selector: 'app-dev-approved-projects',
  templateUrl: './dev-approved-projects.component.html',
  styleUrls: ['./dev-approved-projects.component.scss']
})
export class DevApprovedProjectsComponent implements OnInit {
  projects$: Observable<ActiveProject>;

  constructor(private projectService: ActiveProjectsService,
              private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.projects$ = this.store.select(fromCore.getUserInfo).pipe(
      map((user: UserInfo) => user.id),
      switchMap((id: string) => this.projectService.getActiveProjects(id))
    );
  }

}
