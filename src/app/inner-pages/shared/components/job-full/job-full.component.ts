import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getJobs, State } from 'app/core/reducers';
import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

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
  jobSubscribtion: Subscription = new Subscription();
  job: Job;
  JobSections = JobSections;
  activeSection = JobSections.Project;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private jobsService: JobsService
  ) { }



  ngOnInit(): void {
    const jobId = this.route.snapshot.params.id;
    this.jobSubscribtion = this.store.select(getJobs).pipe(
      flatMap(jobs => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
          return jobs;
        } else {
          return this.jobsService.findJob(jobId);
        }
      })
    ).subscribe( job => {
      this.job = job;
    });
  }

  ngOnDestroy() {
    this.jobSubscribtion.unsubscribe();
  }

  public onSectionCLick(selectedSection: JobSections, element: HTMLElement): void {
    this.activeSection = selectedSection;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

}
