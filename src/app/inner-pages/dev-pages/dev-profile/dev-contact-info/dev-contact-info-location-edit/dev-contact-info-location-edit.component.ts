import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-contact-info-location-edit',
  templateUrl: './dev-contact-info-location-edit.component.html',
  styleUrls: ['./dev-contact-info-location-edit.component.scss']
})
export class DevContactInfoLocationEditComponent implements OnInit {

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
    const aaa = this.form
    debugger
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

  private initForm(): void {
    this.form = new FormGroup({
      address: new FormControl('', []),
      phone: new FormControl('', []),
      timezone: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }
}
