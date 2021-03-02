import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import { getUserInfo } from 'app/core/reducers';
import { UserInfo } from 'app/shared/models';
import { NotificationsService, UserService } from 'app/shared/services';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { UpdateUserProfileAction } from 'app/core/actions/core.actions';

@Component({
  selector: 'app-account-info',
  templateUrl: './dev-account-info.component.html',
  styleUrls: ['./dev-account-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevAccountInfoComponent implements OnInit {

  public photo: string;
  public isEdit: boolean;
  public userInfo$: Observable<UserInfo>;

  public form = new FormGroup({
    userId: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(
    private store: Store<fromCore.State>,
    private userService: UserService,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.userInfo$ = this.store.select(getUserInfo).pipe(
      tap(userInfo => {
        this.photo = userInfo.photo;
        this.form.get('userId').setValue(userInfo.id);
        this.form.get('email').setValue(userInfo.email);
        this.form.get('firstName').setValue(userInfo.firstName);
        this.form.get('lastName').setValue(userInfo.lastName);
      })
    );
  }

  onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  onCancel(): void {
    this.isEdit = false;
    this.formInit();
  }

  onSave(): void {
    const newInfo = {
      photo: this.photo,
      ...this.form.value
    };

    this.userService.updateProfile(newInfo)
      .pipe(first())
      .subscribe((res: UserInfo) => {
        this.store.dispatch(new UpdateUserProfileAction(res));
        this.notificationsService.message
          .emit({ message: 'Account info updated successfully', type: ENotificationStatus.Success });
      });

    this.isEdit = false;
  }

  onUpdatePhoto(event: string): void {
    this.photo = event;
  }
}
