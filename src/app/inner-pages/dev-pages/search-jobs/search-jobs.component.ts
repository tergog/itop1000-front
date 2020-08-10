import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { JobsService } from 'app/shared/services';
import { Job } from 'app/shared/models';
import { getJobs, State } from 'app/core/reducers';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit {

  public jobs$ : Observable<Job[]>;

  constructor(private jobsService: JobsService, private store: Store<State>) { }

  ngOnInit(): void {
    this.jobs$ = this.store.select(getJobs);
  }

}
