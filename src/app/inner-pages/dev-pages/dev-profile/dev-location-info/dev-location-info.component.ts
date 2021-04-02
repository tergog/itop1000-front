import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from 'app/core/reducers';
import { NotificationsService, UserService } from 'app/shared/services';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserInfo } from 'app/shared/models';
import { getUserInfo } from 'app/core/reducers';
import { first, tap } from 'rxjs/operators';
import { UpdateUserProfileAction } from 'app/core/actions/core.actions';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Component({
  selector: 'app-dev-location-info',
  templateUrl: './dev-location-info.component.html',
  styleUrls: ['./dev-location-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevLocationInfoComponent implements OnInit {

  public isTimezoneShown: boolean;
  public isEdit: boolean;
  public userInfo$: Observable<UserInfo>;

  public form = new FormGroup({
    timezone: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl('')
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
      tap(({ timezone, address, phone }) => {
        this.form.get('timezone').setValue(timezone);
        this.form.get('address').setValue(address);
        this.form.get('phone').setValue(phone);
      })
    );
  }

  onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public showTimezone(): void {
    this.isTimezoneShown = true;
  }

  public hideTimezone(): void {
    this.isTimezoneShown = false;
  }

  onCancel(): void {
    this.formInit();
    this.isEdit = false;
  }

  onSave(): void {
    this.userService.updateProfile(this.form.value)
      .pipe(first())
      .subscribe((res: UserInfo) => {
        this.store.dispatch(new UpdateUserProfileAction(res));
        this.notificationsService.message
          .emit({ message: 'Account info updated successfully', type: ENotificationStatus.Success });
      });

    this.isEdit = false;
  }
}
