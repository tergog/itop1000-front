import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as jwtDecode from 'jwt-decode';
import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { NotificationsService, UserService } from 'app/shared/services';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

@Component({
  selector: 'app-dev-contact-info-edit',
  templateUrl: './dev-contact-info-edit.component.html',
  styleUrls: ['./dev-contact-info-edit.component.scss']
})
export class DevContactInfoEditComponent implements OnInit {

  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() updateProfileInfo = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private notificationsService: NotificationsService,
    private store: Store<fromCore.State>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
  }

  public onCancelClick(): void {
    this.cancel.emit();
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    this.save.emit(this.form.value);
    this.userService.updateProfile(this.form.value)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      timezone: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private handleSuccessResponse(userInfo): void {
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.updateProfileInfo.emit(userInfo);
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

}
