import { Component, OnInit } from '@angular/core';
import * as fromCore from "../../../../core/reducers";
import {map, switchMap} from "rxjs/operators";
import {ActiveProject, UserInfo} from "../../../../shared/models";
import {ActiveProjectsService} from "../../../../shared/services";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dev-approved-projects',
  templateUrl: './dev-approved-projects.component.html',
  styleUrls: ['./dev-approved-projects.component.scss']
})
export class DevApprovedProjectsComponent implements OnInit {
  projects$: Observable<any>

  constructor(private projectService: ActiveProjectsService,
              private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.projects$ = this.store.select(fromCore.getUserInfo).pipe(
      map((user: UserInfo) => user.id),
      switchMap((id: string) => this.projectService.getActiveProjects(id))
    );
    // this.projects$.subscribe(data => console.log('active in approved', data.activeProjects))
    // console.log("active", this.activeProject)
  }

}
