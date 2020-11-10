import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { UserInfo} from 'app/shared/models';
import { timezones} from 'app/constants/constants';
import { ClientProfileService } from 'app/inner-pages/client-pages/client-profile/client-profile.service';


@Component({
  selector: 'app-client-contact-info-location-edit',
  templateUrl: './client-contact-info-location-edit.component.html',
  styleUrls: ['./client-contact-info-location-edit.component.scss']
})
export class ClientContactInfoLocationEditComponent implements OnInit, OnDestroy {

  public isPopupShown: boolean;
  public filteredTimezones = timezones;
  public form: FormGroup;

  @Input() userInfo: UserInfo;
  @Output() updateProfileInfo = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(
    private clientProfileService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.form.patchValue(this.userInfo);

    this.form.get('timezone').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(value => value.trim()),
      switchMap(value =>
        of(timezones.filter(timezone => timezone.includes(value)))
      ),
      filter(timezone => !timezone.includes(this.form.get('timezone').value)),
      untilDestroyed(this),
    ).subscribe((timezones: string[]) => this.setFilteredTimezones(timezones));
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
    this.clientProfileService.onSaveClick(this.form.value);
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    this.save.emit(this.form.value);
    this.clientProfileService.onSaveClick(this.form.value);
  }

  public setFilteredTimezones(timezones: string[]): void {
    this.onShowPopup();
    this.filteredTimezones = timezones;
  }

  public onTimezoneSelect(timezone: string): void {
    this.form.get('timezone').setValue(timezone, { emitModelToViewChange: false });
    this.onHidePopup();
  }

  public onShowPopup(): void {
    this.isPopupShown = true;
  }

  public onHidePopup(): void {
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

  ngOnDestroy(): void {}

}
