import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { timezones } from 'app/constants/constants';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimezoneComponent),
      multi: true
    }
  ]
})
export class TimezoneComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public currentTimezones: string[] = timezones;
  private unitFormControl: FormControl;

  @Output() selectedTimezone = new EventEmitter();
  @Output() filteredTimezones = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.unitFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => value.trim()),
      switchMap((value) =>
        of(timezones.filter((timezone) => timezone.includes(value)))
      ),
      filter((timezone) => !timezone.includes(this.unitFormControl.value)),
      untilDestroyed(this),
    ).subscribe((timezonesArr: string[]) => this.setFilteredTimezones(timezonesArr));
  }

  public selectTimezone(timezone: string): void {
    this.selectedTimezone.emit(timezone);
  }

  public setFilteredTimezones(timezonesArr: string[]): void {
    this.filteredTimezones.emit();
    this.currentTimezones = timezonesArr;
  }

  ngOnDestroy() {
  }

  @Input()
  set formControl(obj) {
    this.unitFormControl = obj;
    this.registerOnChange(this.unitFormControl);
  }

  get formControl() {
    return this.unitFormControl;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
