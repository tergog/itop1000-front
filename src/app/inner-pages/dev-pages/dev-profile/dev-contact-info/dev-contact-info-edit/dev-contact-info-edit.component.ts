import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserInfo } from 'app/shared/models';
import { timezones } from 'app/constants/constants';
import { of } from 'rxjs';
import { map, debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-dev-contact-info-edit',
  templateUrl: './dev-contact-info-edit.component.html',
  styleUrls: ['./dev-contact-info-edit.component.scss']
})
export class DevContactInfoEditComponent implements OnInit, OnDestroy {
  public isPopupShown: boolean;

  @Input() userInfo: UserInfo;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public form: FormGroup;
  public filteredTimezones = timezones;

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
    ).subscribe((timezones: string[]) => this.setFilteredTimezones(timezones))
  }

  public onCancelClick(): void {
    this.cancel.emit();
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

  public onSaveClick(): void {
    if(this.form.valid) {
      this.disableEmptyFields();
      this.save.emit(this.form.value);
    }
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

  ngOnDestroy(): void {}
}
