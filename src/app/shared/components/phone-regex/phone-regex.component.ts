import {Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-phone-regex',
  templateUrl: './phone-regex.component.html',
  styleUrls: ['./phone-regex.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneRegexComponent),
      multi: true
    }
  ]
})
export class PhoneRegexComponent implements OnInit, ControlValueAccessor {

  @HostBinding('class.inner') get valid() { return this.type === 'inner' }
  @Input() type: string;
  @Input() placeholder;
  @Input() isHiddenPassword: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(this._value);
  }

  get value(): any {
    return this._value;
  }

  _value: any;

  writeValue(value: number): void {
    this._value = value;
    this.onChange(this._value);
  }

  private onChange = (value: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
