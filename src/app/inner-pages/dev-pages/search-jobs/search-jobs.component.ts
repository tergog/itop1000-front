import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { getJobs, State } from 'app/core/developers/store/index';
import { getUserInfo } from '../../../core/reducers';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

  public jobs: Job[] = [];
  public jobsPaginated: Job[] = [];
  public ngUnsubscribe$ = new Subject<void>();
  public userId: string;

  constructor(
    private jobsService: JobsService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(getJobs)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(jobs => {
        this.jobs = jobs;
        this.jobsPaginated = this.jobs.slice(0, 2);
    });
    this.store.select(getUserInfo)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => {
        this.userId = user.id;
      });
  }

  onPageChange($event) {
    this.jobsPaginated = this.jobs.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  public onJobClick(id: string): void {
    this.router.navigate(['in/d/search-jobs', id]);
  }

  public getJobStatus(job: Job): boolean {
    return job.devProposals.includes(this.userId);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
