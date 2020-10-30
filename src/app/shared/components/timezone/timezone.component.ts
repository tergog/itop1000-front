import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  private timezoneSource = new BehaviorSubject<FormControl>(null);
  /*private timezoneSource$: Observable<FormControl> = this.timezoneSource.asObservable();*/

  @Output() selectedTimezone = new EventEmitter();
  @Output() filteredTimezones = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.timezoneSource.value.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => value.trim()),
      switchMap((value) =>
        of(timezones.filter((timezone) => timezone.includes(value)))
      ),
      filter((timezone) => !timezone.includes(this.timezoneSource.value.value)),
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
  set formControl(obj: FormControl) {
    this.timezoneSource.next(obj);
    this.writeValue(this.timezoneSource.value);
  }

  get formControl() {
    return this.timezoneSource.value;
  }

  private onChange = (obj: FormControl) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (obj: FormControl) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(obj: FormControl): void {
    this.onChange(this.timezoneSource.value);
  }
}
