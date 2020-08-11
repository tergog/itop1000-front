import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ApiConstants} from '../../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.http.post(`${environment.apiUrl}${ApiConstants.accounts.verifyEmail}`, { token: queryParam.token }).subscribe();
        this.router.navigate(['/auth', 'login']).then();
      }
    );
  }

  ngOnInit(): void {
  }

}
