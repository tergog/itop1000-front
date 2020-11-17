import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { getJobs, State } from 'app/core/reducers';
import { Job } from 'app/shared/models';
import { JobsService, NotificationsService } from 'app/shared/services';
import * as fromCore from 'app/core/reducers';
import { ConfirmationDialogComponent } from 'app/inner-pages/shared/components/confirmation-dialog/confirmation-dialog.component';

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
  public canEdit: boolean;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private matDialog: MatDialog,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.store.select(getJobs)
      .pipe(
        untilDestroyed(this),
        flatMap(jobs => this.getJobFromStore(jobs)))
      .subscribe((job: Job) => {
        this.job = job;
        this.store.select(fromCore.getUserInfo)
          .subscribe(user => this.canEdit = user.id === this.job.userId);
      });
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

  onRespondClick(): void {
    this.router.navigate(['in/d/chat']);
  }

  onDeleteClick(): void {
    const dialogRef =  this.matDialog.open(ConfirmationDialogComponent, {data: {title: 'Archive job', text: `Are you sure you want to delete the ${this.job.title} job?`}});

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(res => { if (res === 'Confirmed') this.onDeleteJob()})
  }

  onEditJob() {

  }

  onDeleteJob() {
    this.jobsService.deleteJob(this.job.id)
      .subscribe(() => {
          this.handleSuccessResponse();
          this.router.navigate(['in/c/profile']);
        },
        error => this.handleErrorResponse(error)
      )
  }

  private handleSuccessResponse(): void {
    this.notificationsService.message.emit({
      message: 'Changes successfully saved',
      type: 'success'
    });
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
