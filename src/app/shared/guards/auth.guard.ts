import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { UserService } from '../services';
import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private userService: UserService,
      private store: Store<fromCore.State>,
    ) {}

    canActivate(): Observable<boolean> {
        return this.userService.isValidSession().pipe(
            first(),
            shareReplay(1),
            map((isValid: boolean) => {
                if (isValid) {
                  const token = localStorage.getItem(TOKEN);
                  const userInfo = jwtDecode(token);
                  this.store.dispatch(new coreActions.SetOnLoginAction(userInfo));
                  return true;
                }
                // otherwise redirected to login page
                this.router.navigate(['/landing']);
                return false;
            })
        );
    }
}
