import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Job } from 'app/shared/models';
import { DevelopersService, JobsService } from 'app/shared/services';
import { getJobs, State } from 'app/core/reducers/index';
import { GetJobsAction } from 'app/core/client/store/actions';
import { getDeveloperCategories } from 'app/core/developers/store/developers.actions';
import * as fromDev from 'app/core/developers/store';

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
    private router: Router,
    private developerService: DevelopersService,
    private storeDev: Store<fromDev.State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetJobsAction());
    this.jobs$ = this.store.select(getJobs);

    this.developerService.getDeveloperCategories().pipe(
      first()
    ).subscribe(value => this.storeDev.dispatch(getDeveloperCategories(value)));
  }

  public postJobClick(): void {
    this.isCreateJob = true;
  }

  public onJobClick(id: string): void {
    this.router.navigate(['/in/c/profile/job', id]);
  }
}
