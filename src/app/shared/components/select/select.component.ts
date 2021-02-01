import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @Input() options = ['Client', 'Dev'];
  value;
  isExpand: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  expand(): void {
    this.isExpand = !this.isExpand;
  }

  select(event: string): void {
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
