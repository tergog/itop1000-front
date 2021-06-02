import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { Job, UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-project-applications',
  templateUrl: './dev-project-applications.component.html',
  styleUrls: ['./dev-project-applications.component.scss']
})
export class DevProjectApplicationsComponent implements OnInit, OnDestroy {
  @Input() projects: Observable<UserInfo>;
  projectsApplications: Job[];
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    this.projects.pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
      this.projectsApplications = res.projectApplications;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
