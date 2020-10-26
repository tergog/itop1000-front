import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-contact-info-location-edit',
  templateUrl: './dev-contact-info-location-edit.component.html',
  styleUrls: ['./dev-contact-info-location-edit.component.scss']
})
export class DevContactInfoLocationEditComponent implements OnInit {

  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() updateProfileInfo = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private devProfileService: DevProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
  }

  public onCancelClick(): void {
    this.cancel.emit();
  }

  public onCancelLocationClick(): void {
    this.cancel.emit();
  }

  public onSaveLocationClick(): void {
    this.disableEmptyFields();
    this.save.emit(this.form.value);
    this.devProfileService.onSaveClick(this.form.value);
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    this.save.emit(this.form.value);
    this.devProfileService.onSaveClick(this.form.value);
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
