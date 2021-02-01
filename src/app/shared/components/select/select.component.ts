import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EUserRole } from 'app/shared/enums';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() options = [EUserRole.Client, EUserRole.Dev];
  value: string;
  isExpand = false;

  constructor() { }

  ngOnInit(): void {
  }

  expand(): void {
    this.isExpand = !this.isExpand;
  }

  select(event: string): void {
    if (event === this.value) {
      return;
    }
    this.value = event;
    this.isExpand = false;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || 'Role';
  }

  private onChange = (value: string) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
