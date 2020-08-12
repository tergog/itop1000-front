import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
    this.route.queryParams.subscribe(
      ({ token }) => {
         this.userService.verifyToken(token).pipe(untilDestroyed(this)).subscribe(() => {
            this.router.navigate(['/auth', 'login']);
        });
      }
    );
  }

  ngOnDestroy(): void { }

}
