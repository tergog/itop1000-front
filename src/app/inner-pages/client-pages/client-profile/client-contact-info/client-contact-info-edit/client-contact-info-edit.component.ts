import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { UserInfo } from 'app/shared/models';
import { ClientProfileService } from 'app/inner-pages/client-pages/client-profile/client-profile.service';

@Component({
  selector: 'app-client-contact-info-edit',
  templateUrl: './client-contact-info-edit.component.html',
  styleUrls: ['./client-contact-info-edit.component.scss']
})
export class ClientContactInfoEditComponent implements OnInit, OnDestroy {

  @Input() userInfo: UserInfo;
  @Output() updateProfileInfo = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public form: FormGroup;

  constructor(
    private clientProfileService: ClientProfileService
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
    this.clientProfileService.onSaveClick(this.form.value);
  }

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl('', []),
      firstName: new FormControl('', []),
      email: new FormControl('', []),
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  ngOnDestroy(): void {}

}
