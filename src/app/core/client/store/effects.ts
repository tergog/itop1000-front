import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/internal/operators';

import * as clientActions from 'app/core/client/store/actions';
import { JobsService } from 'app/shared/services';
import { Job } from 'app/shared/models';


@Injectable()
export class ClientEffects {

  constructor(
      private actions$: Actions,
      private jobsService: JobsService,
    ) {}

  onGetJobs$ = createEffect(() => this.actions$.pipe(
    ofType(clientActions.GET_JOBS),
    switchMap(() => this.jobsService.getJobs()),
    map((jobs: Job[]) => new clientActions.GetJobsSuccessAction(jobs))
  ));

}
