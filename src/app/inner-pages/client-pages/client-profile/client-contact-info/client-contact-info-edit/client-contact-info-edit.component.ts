import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { UserInfo } from 'app/shared/models';
import { ClientProfileService } from 'app/inner-pages/client-pages/client-profile/client-profile.service';

@Component({
  selector: 'app-client-contact-info-edit',
  templateUrl: './client-contact-info-edit.component.html',
  styleUrls: ['./client-contact-info-edit.component.scss']
})
export class ClientContactInfoEditComponent implements OnInit {

  public isTimezoneShown: boolean;
  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private clientProfileService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
  }

  public saveChanges(): void {
    this.disableEmptyFields();
    this.save.emit();
    this.clientProfileService.onSaveClick(this.form.value);
  }

  public cancelChanges(): void {
    this.cancel.emit();
  }

  public showTimezone(): void {
    this.isTimezoneShown = true;
  }

  public hideTimezone(): void {
    this.isTimezoneShown = false;
  }

  public setTimezone(timezone: string): void {
    this.form.get('timezone').setValue(timezone, { emitModelToViewChange: false });
    this.hideTimezone();
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', []),
      email: new FormControl('', []),
      timezone: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

}
