import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { filter, flatMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import * as fromCore from 'app/core/reducers';
import { getJobs, State } from 'app/core/reducers';
import { Job } from 'app/shared/models';
import { JobsService, NotificationsService } from 'app/shared/services';
import { ConfirmationDialogComponent } from 'app/inner-pages/shared/components/confirmation-dialog/confirmation-dialog.component';
import { EditJobDialogComponent } from 'app/inner-pages/shared/components/edit-job-dialog/edit-job-dialog.component';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

export enum EJobSections {
  Project,
  Duration,
  KeySkills
}

export enum EResMessage {
  Confirmed = 'Confirmed',
  Updated = 'Job updated successfully'
}

@Component({
  selector: 'app-job-full',
  templateUrl: './job-full.component.html',
  styleUrls: ['./job-full.component.scss']
})
export class JobFullComponent implements OnInit, OnDestroy {
  job: Job;
  JobSections = EJobSections;
  resMessage = EResMessage;
  activeSection = EJobSections.Project;
  public canEdit: boolean;
  public ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private matDialog: MatDialog,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getJobInfo();
  }

  getJobInfo() {
    this.store.select(getJobs)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        flatMap(jobs => this.getJobFromStore(jobs)),
        tap((job: Job) => this.job = job),
        switchMap(() => this.store.select(fromCore.getUserInfo)),
        filter(user => !!user)
      )
      .subscribe(user => this.canEdit = user.id === this.job.userId);
  }

  public onSectionCLick(selectedSection: EJobSections, element: HTMLElement): void {
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
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(res => res === this.resMessage.Confirmed),
        tap(() => this.onDeleteJob())
      )
      .subscribe();
  }

  public onDeleteJob(): void {
    this.jobsService.deleteJob(this.job.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        () => {
          this.handleSuccessResponse();
          this.router.navigate(['in/c/profile']); },
        error => this.handleErrorResponse(error)
      );
  }

  public onEditClick(): void {
    const dialogRef =  this.matDialog.open(EditJobDialogComponent, {data: {job: this.job}});

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(res => res === this.resMessage.Updated),
        tap(() => {
          this.getJobInfo();
          this.handleSuccessResponse();
        })
      ).subscribe();
  }

  private handleSuccessResponse(): void {
    this.notificationsService.message.emit({
      message: 'Changes successfully saved',
      type: ENotificationStatus.Success
    });
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: ENotificationStatus.Error
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
