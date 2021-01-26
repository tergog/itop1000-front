import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { getJobs, State } from 'app/core/reducers/index';
import { GetJobsAction } from 'app/core/client/store/actions';

@Component({
  selector: 'app-client-posted-jobs',
  templateUrl: './client-posted-jobs.component.html',
  styleUrls: ['./client-posted-jobs.component.scss']
})
export class ClientPostedJobsComponent implements OnInit {

  public isCreateJob: boolean;
  public jobs$: Observable<Job[]>;

  constructor(
    private store: Store<State>,
    private jobsService: JobsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetJobsAction());
    this.jobs$ = this.store.select(getJobs);
  }

  public postJobClick(): void {
    this.isCreateJob = true;
  }

  public onEditClick(): void {
    this.isCreateJob = !this.isCreateJob;
  }

  public onJobClick(id: string): void {
    this.router.navigate(['/in/c/profile/job', id]);
  }
}
