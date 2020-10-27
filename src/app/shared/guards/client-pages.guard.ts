import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import { getUserInfo } from 'app/core/reducers';
import { UserInfo } from 'app/shared/models';
import { UserRole } from 'app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class ClientPagesGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<fromCore.State>,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getUserInfo).pipe(
      map((userInfo: UserInfo) => userInfo.role === UserRole.Client),
      tap((isClient: boolean) => (isClient || this.router.navigate(['/in/d/profile'])))
    );
  }

}
