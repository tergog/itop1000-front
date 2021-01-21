import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserInfo } from 'app/shared/models';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';

@Component({
  selector: 'app-dev-contact-info-edit',
  templateUrl: './dev-contact-info-edit.component.html',
  styleUrls: ['./dev-contact-info-edit.component.scss']
})
export class DevContactInfoEditComponent implements OnInit {

  public isTimezoneShown: boolean;
  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private devProfileService: DevProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
  }

  public saveChanges(): void {
    this.disableEmptyFields();
    this.save.emit();
    this.devProfileService.onSaveClick(this.form.value);

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
      lastName: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[+]{1}[0-9]{12}$')]),
      email: new FormControl('', []),
      timezone: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

}
