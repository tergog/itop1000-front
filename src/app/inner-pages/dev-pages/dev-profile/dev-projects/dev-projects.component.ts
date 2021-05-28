import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCore from "../../../../core/reducers";
import {map, switchMap} from "rxjs/operators";
import {ActiveProject, UserInfo} from "../../../../shared/models";
import {ActiveProjectsService} from "../../../../shared/services";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dev-projects',
  templateUrl: './dev-projects.component.html',
  styleUrls: ['./dev-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevProjectsComponent implements OnInit {

  projects$: Observable<ActiveProject>;
  userAddress;
  today = new Date();

  constructor(private projectService: ActiveProjectsService,
              private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.projects$ = this.store.select(fromCore.getUserInfo).pipe(
      map((user: UserInfo) => {
        this.userAddress = user.address;
        return user.id;
      }),
      switchMap((id: string) => this.projectService.getActiveProjects(id))
    );
  }

}
