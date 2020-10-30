import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { timezones } from 'app/constants/constants';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit, OnDestroy {

  public currentTimezones: string[] = timezones;

  @Input() show: boolean;
  @Input() formGroup: FormGroup;
  @Output() selectedTimezone = new EventEmitter();
  @Output() filteredTimezones = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup.get('timezone').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => value.trim()),
      switchMap((value) =>
        of(timezones.filter((timezone) => timezone.includes(value)))
      ),
      filter((timezone) => !timezone.includes(this.formGroup.get('timezone').value)),
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
}
