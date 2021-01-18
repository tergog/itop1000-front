import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { State } from 'app/core/reducers/index';
import { GetJobsAction } from 'app/core/client/store/actions';
import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services/jobs.service';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditJobDialogComponent } from '../edit-job-dialog/edit-job-dialog.component';
import { EJobSections } from '../job-full/job-full.component';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  @Input() job: Job;

  JobSections = EJobSections;
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

  ngOnInit(): void {
  }

  onEditClick(): void {
    const dialogRef = this.matDialog.open(EditJobDialogComponent, {data: {job: this.job}});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        if (res === 'Job updated successfully') {
        this.handleSuccessResponse(res);
      }});
  }

  onArchiveClick(): void {
    const dialogRef =  this.matDialog.open(ConfirmationDialogComponent, {data: {title: 'Archive job', text: `Are you sure you want to delete the ${this.job.title} job?`}});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => { if (res === 'Confirmed') { this.onDeleteJob(); }});
  }

  onDeleteJob(): void{
    this.jobsService.deleteJob(this.job.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res) => {
          this.handleSuccessResponse(res);
          this.store.dispatch(new GetJobsAction());
          },
          error => this.handleErrorResponse(error)
      );
  }

  private handleSuccessResponse(res: any): void {
    this.notificationsService.message.emit({
      message: res,
      type: ENotificationStatus.Success
    });
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: ENotificationStatus.Error
    });
  }

  public onJobClick(): void {
    this.router.navigate([`/in/c/profile/job/${this.job.id}`]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
