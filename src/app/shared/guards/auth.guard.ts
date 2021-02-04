import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';


import { UserService } from '../services';
import { TOKEN } from 'app/constants/constants';
import { State } from 'app/core/reducers/index';
import { SetOnLoginAction } from 'app/core/actions/core.actions';
import { UserInfo } from 'app/shared/models';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private userService: UserService,
      private store: Store<State>,
    ) {}

    canActivate(): Observable<boolean> {
        return this.userService.isValidSession().pipe(
            first(),
            shareReplay(1),
            switchMap(() =>
              this.userService.getUserInfo().pipe(
                tap((res: UserInfo) => this.store.dispatch(new SetOnLoginAction(res))),
                map(_ => true)
              )
            ),
          catchError(res => {
            this.router.navigate(['/auth/login']);
            return of(false);
          })
        );
    }
}
