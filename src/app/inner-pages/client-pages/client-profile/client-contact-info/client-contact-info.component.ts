import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/services';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../../shared/models';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../../core/reducers';

@Component({
  selector: 'app-client-contact-info',
  templateUrl: './client-contact-info.component.html',
  styleUrls: ['./client-contact-info.component.scss']
})
export class ClientContactInfoComponent implements OnInit {

  public isEdit: boolean;
  public userInfo$: Observable<UserInfo>;

  constructor(
    private userService: UserService,
    private store: Store<fromCore.State>,
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public editToggle(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.isEdit = false;
  }
}
