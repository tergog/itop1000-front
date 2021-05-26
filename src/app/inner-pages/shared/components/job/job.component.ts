import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

import { EUserRole } from 'app/shared/enums';
import { ActiveProjectsService } from 'app/shared/services';
import { getUserInfo, State } from 'app/core/reducers/index';
import { EJobSections } from '../job-full/job-full.component';
import { JobsService } from 'app/shared/services/jobs.service';
import { ActiveProject, Job, UserInfo } from 'app/shared/models';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { DeleteJobAction, UpdateJobAction } from 'app/core/client/store/actions';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { EditJobDialogComponent } from '../edit-job-dialog/edit-job-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  @Input() job: Job;
  @Input() applyState: boolean;
  userID: string;
  userRole$: Observable<EUserRole>;
  role = EUserRole;
  JobSections = EJobSections;
  activeSection = EJobSections.Project;
  public canEdit: boolean;
  public ngUnsubscribe$ = new Subject<void>();
  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private activeProjectService: ActiveProjectsService,
    private matDialog: MatDialog,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.userRole$ = this.store.select(getUserInfo).pipe(
      first(),
      tap(user => this.userID = user.id),
      map((user: UserInfo) => user.role)
    );
  }

  onEditClick(): void {
    const dialogRef = this.matDialog.open(EditJobDialogComponent, {data: {job: this.job}});
    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        if (res.msg === 'Job updated successfully') {
          this.store.dispatch(new UpdateJobAction(res.data));
          this.handleSuccessResponse(res.msg);
      }});
  }

  onArchiveClick(): void {
    const dialogRef =  this.matDialog.open(ConfirmationDialogComponent, {data: {title: 'Archive job', text: `Are you sure you want to delete the ${this.job.title} job?`}});

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(res => res === 'Confirmed')
      )
      .subscribe(res => this.onDeleteJob());
  }

  onDeleteJob(): void{
    this.jobsService.deleteJob(this.job.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res) => {
          this.handleSuccessResponse(res);
          this.store.dispatch(new DeleteJobAction(this.job.id));
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

  public applyDev(): void {
    this.jobsService.applyDevToJob(this.job.id, this.userID)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.applyState = !this.applyState;
      });

    //MOCK
    const activeJob: ActiveProject = {
      title: this.job.title,
      employerId: this.job.userId,
      developerId: this.userID,
      screenshotsPerHour: 6,
      workTime: { test : { test: 5 }} ,
      dayWorkTime: 3,
      hoursPerWeek: 3,
      screenshots: [],
    };
    this.activeProjectService.setProjects(activeJob)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {});

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
