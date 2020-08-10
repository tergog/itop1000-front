import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';

@Component({
  selector: 'app-client-posted-jobs',
  templateUrl: './client-posted-jobs.component.html',
  styleUrls: ['./client-posted-jobs.component.scss']
})
export class ClientPostedJobsComponent implements OnInit {

  public isCreateJob: boolean;
  public jobs$: Observable<Job[]>;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.jobs$ = this.jobsService.getJobs()
      .pipe(shareReplay());
  }

  public postJobClick(): void {
    this.isCreateJob = true;
  }

}
