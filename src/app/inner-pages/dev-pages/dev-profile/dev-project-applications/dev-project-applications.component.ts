import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Job, UserInfo } from '../../../../shared/models';

@Component({
  selector: 'app-dev-project-applications',
  templateUrl: './dev-project-applications.component.html',
  styleUrls: ['./dev-project-applications.component.scss']
})
export class DevProjectApplicationsComponent implements OnInit {
  @Input() projects: Observable<UserInfo>;
  projectsApplications: Job[];

  constructor() { }

  ngOnInit(): void {
    this.projects.subscribe( res => {
      this.projectsApplications = res.projectApplications;
    });
  }

}
