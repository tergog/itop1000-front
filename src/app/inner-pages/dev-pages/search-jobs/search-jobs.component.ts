import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { JobsService } from 'app/shared/services';
import { Job } from 'app/shared/models';
import { getJobs, State } from 'app/core/reducers';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

  public jobs: Job[] = [];
  public jobsPaginated: Job[] = [];

  constructor(
    private jobsService: JobsService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(getJobs)
      .pipe(untilDestroyed(this))
      .subscribe(jobs=> {
        this.jobs= jobs;
        this.jobsPaginated= this.jobs.slice(0, 2);
    });
  }

  onPageChange($event) {
    this.jobsPaginated = this.jobs.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  public onJobClick(id: string): void {
    this.router.navigate(['in/d/search-jobs', id]);
  }

  ngOnDestroy(): void {
  }
}
