import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
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
export class TimezoneComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @Input() currentTimezone: string;
  public filteredTimezones: string[] = timezones;

  private timezoneSource = new BehaviorSubject<string>(null);

  constructor() { }

  ngOnInit(): void {
  }

  public selectTimezone(timezone: string): void {
    this.writeValue(timezone);
  }

  public setFilteredTimezones(): void {
    this.timezoneSource.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => value.trim()),
      switchMap((value) =>
        of(timezones.filter((timezone) => timezone.includes(value)))
      ),
      filter((timezone) => !timezone.includes(this.timezoneSource.value)),
      untilDestroyed(this),
    ).subscribe((timezonesArr: string[]) => this.filteredTimezones = timezonesArr);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.timezoneSource.next(this.currentTimezone);
    this.setFilteredTimezones();
  }

  ngOnDestroy() {
  }

  private onChange = (timezone: string) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (timezone: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(timezone: string): void {
    this.onChange(timezone);
  }
}
