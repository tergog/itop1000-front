import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    switchMap(() => this.jobsService.getJobs().pipe(
      map((jobs: Job[]) => new clientActions.GetJobsSuccessAction(jobs)),
      catchError(err => of(new clientActions.GetJobsFailAction(err)))
    )   
  )
  ));
}
