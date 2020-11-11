import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserInfo} from 'app/shared/models';
import { ClientProfileService } from 'app/inner-pages/client-pages/client-profile/client-profile.service';


@Component({
  selector: 'app-client-contact-info-location-edit',
  templateUrl: './client-contact-info-location-edit.component.html',
  styleUrls: ['./client-contact-info-location-edit.component.scss']
})
export class ClientContactInfoLocationEditComponent implements OnInit {

  public isPopupShown: boolean;
  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() updateProfileInfo = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(private clientProfileService: ClientProfileService) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
  }

  public onCancelLocationClick(): void {
    this.cancel.emit();
  }

  public onSaveLocationClick(): void {
    this.disableEmptyFields();
    this.save.emit(this.form.value);
    this.clientProfileService.onSaveClick(this.form.value);
  }

  public showTimezone(): void {
    this.isPopupShown = true;
  }

  public hideTimezone(): void {
    this.isPopupShown = false;
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
