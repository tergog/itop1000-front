import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Developer, Job, UserInfo } from 'app/shared/models';
import { DevelopersService } from 'app/shared/services';

@Component({
  selector: 'app-project-applications',
  templateUrl: './project-applications.component.html',
  styleUrls: ['./project-applications.component.scss']
})
export class ProjectApplicationsComponent implements OnInit {

  @Input() job: Job;
  users: UserInfo[];
  developers$: Observable<UserInfo | Developer[]>;

  constructor(
    private devService: DevelopersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const job = this.activatedRoute.snapshot.params;
    this.developers$ = this.devService.getDevelopersById(job.devProposals.split(',')).pipe(
      first()
    );
  }

  onPageChange($event: any) {

  }

  onProfileClick($event: string) {

  }
}
