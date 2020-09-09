import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public jobs$: Observable<Job[]>;

  constructor(private jobsService: JobsService,
              private store: Store<State>,
              private router: Router) { }

  ngOnInit(): void {
    this.jobs$ = this.store.select(getJobs);
  }

  onJobClick(id: string) {
    this.router.navigate(['in/d/search-jobs', id]);
  }
}
