import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';

import { UserService } from 'app/shared/services';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  constructor(
              private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      untilDestroyed(this),
      switchMap(({ token }) => this.userService.verifyToken(token))
    ).subscribe(() => {
      this.router.navigate(['/auth', 'login']);
    });
  }

  ngOnDestroy(): void { }

}
