import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import { Job, UserInfo } from 'app/shared/models';
import { ActiveProjectsService } from 'app/shared/services';

@Component({
  selector: 'app-dev-projects',
  templateUrl: './dev-projects.component.html',
  styleUrls: ['./dev-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevProjectsComponent implements OnInit {

  projects$: Observable<Job>;
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
      switchMap((id: string) => this.projectService.getProjectApplications(id))
    );
  }

}
