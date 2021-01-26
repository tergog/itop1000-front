import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { SetOnLogoutAction } from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromCore.State>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.store.dispatch(new SetOnLogoutAction());
        }

        return throwError(
          (error.error instanceof ErrorEvent) ?
            `Client error: ${error.error.message}` :
            `Server error[${error.status}]: ${error.message}`
        );
      })
    );
  }
}
