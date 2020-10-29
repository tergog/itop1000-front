import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserInfo } from '../../../../../shared/models';
import { timezones } from '../../../../../constants/constants';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ClientProfileService } from '../../client-profile.service';

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

  public isPopupShown: boolean;
  public filteredTimezones = timezones;
  public form: FormGroup;

  constructor(
    private clientProfileService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.userInfo);
    this.form.get('timezone').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => value.trim()),
      switchMap((value) =>
        of(timezones.filter((timezone) => timezone.includes(value)))
      ),
      filter((timezone) => !timezone.includes(this.form.get('timezone').value)),
      untilDestroyed(this),
    ).subscribe((timezones: string[]) => this.setFilteredTimezones(timezones));
  }

  public onCancelClick(): void {
    this.cancel.emit();
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

  ngOnDestroy(): void {}

}
