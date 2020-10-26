import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, of, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { getJobs, State } from 'app/core/reducers';
import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';

export enum JobSections {
  Project,
  Duration,
  KeySkills
}

@Component({
  selector: 'app-job-full',
  templateUrl: './job-full.component.html',
  styleUrls: ['./job-full.component.scss']
})
export class JobFullComponent implements OnInit, OnDestroy {
  job: Job;
  JobSections = JobSections;
  activeSection = JobSections.Project;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.store.select(getJobs)
      .pipe(
        untilDestroyed(this),
        flatMap(jobs => this.getJobFromStore(jobs))
      )
      .subscribe((job: Job) => this.job = job);
  }

  ngOnDestroy() { }

  public onSectionCLick(selectedSection: JobSections, element: HTMLElement): void {
    this.activeSection = selectedSection;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  private getJobFromStore(jobs): Observable<Job> {
    const jobId = this.route.snapshot.params.id;
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      return of(job);
    } else {
      return this.jobsService.findJob(jobId);
    }
  }
}
