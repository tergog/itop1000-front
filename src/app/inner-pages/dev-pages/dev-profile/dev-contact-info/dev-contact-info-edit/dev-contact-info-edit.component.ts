import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-contact-info-edit',
  templateUrl: './dev-contact-info-edit.component.html',
  styleUrls: ['./dev-contact-info-edit.component.scss']
})
export class DevContactInfoEditComponent implements OnInit {

  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() { }

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
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
    })
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

}
