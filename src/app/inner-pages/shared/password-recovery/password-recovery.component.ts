import { Component, OnInit } from '@angular/core';
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

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo).pipe(map(user => user.email), catchError((err) => of("dummymail@mail.com")))
    console.log(this.blurEmailUtility("dummymail@mail.com"))
  }

  handleClickButton() { }

  blurEmailUtility(email: string) {
    const nameEmail = email.split("@")[0]
    const blurNameEmail = nameEmail[0] + '***' + nameEmail[nameEmail.length - 1]
    return blurNameEmail + "@" + email.split("@")[1]
  }

}
