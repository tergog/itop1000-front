import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { On, Store } from '@ngrx/store';
import { GetJobsAction } from 'app/core/client/store/actions';

import { State } from 'app/core/reducers/index';

import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services/jobs.service';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditJobDialogComponent } from '../edit-job-dialog/edit-job-dialog.component';
import { JobSections } from '../job-full/job-full.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  @Input() job: Job;

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

  ngOnInit(): void {
  }

  onEditClick() {
    const dialogRef = this.matDialog.open(EditJobDialogComponent, {data: {job: this.job}});

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res === 'Job updated successfully') {
        this.handleSuccessResponse(res);
      }});
  }

  onArchiveClick() {
    const dialogRef =  this.matDialog.open(ConfirmationDialogComponent, {data: {title: 'Archive job', text: `Are you sure you want to delete the ${this.job.title} job?`}});

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(res => { if (res === 'Confirmed') { this.onDeleteJob(); }});
  }

  onDeleteJob(){
    this.jobsService.deleteJob(this.job.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          this.handleSuccessResponse(res);
          this.store.dispatch(new GetJobsAction())
          },
        error => this.handleErrorResponse(error)
      );
  }

  private handleSuccessResponse(res): void {
    this.notificationsService.message.emit({
      message: res.message ? res.message : res,
      type: 'success'
    });
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

  public onJobClick(): void {
    this.router.navigate([`/in/c/profile/job/${this.job.id}`]);
  }
  
  ngOnDestroy() {}
}
