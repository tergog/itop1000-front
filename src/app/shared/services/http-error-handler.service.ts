import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import * as fromCore from 'app/core/reducers';
import { SetOnLogoutAction } from 'app/core/actions/core.actions';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(public router: Router, private store: Store<fromCore.State>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.store.dispatch(new SetOnLogoutAction());
        }
        throw error;
      })
    );
  }
}
