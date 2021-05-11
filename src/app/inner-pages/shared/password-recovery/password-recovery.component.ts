import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserInfo, State } from 'app/core/reducers';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  userInfo$: Observable<any>

  constructor(public store: Store<State>, public router: Router) { }

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo).pipe(map(user => user.email), catchError((err) => of(false)))
  }

  handleClickButton() {
    this.router.navigate(["/"])
  }

}
