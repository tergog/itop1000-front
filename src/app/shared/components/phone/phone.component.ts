import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneComponent),
      multi: true
    }
  ]
})
export class PhoneComponent implements OnInit, ControlValueAccessor {

  @HostBinding('class.inner') get valid() { return this.type === 'inner'}
  @Input() type: string;
  @Input() placeholder;
  @Input() isHiddenPassword: boolean;
  @Output() enterKey = new EventEmitter();
  @Output() onFocusField = new EventEmitter();

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set value(value: any) {
    this._value = value?.number || value;
    this.writeValue(value);
  }

  get value(): any {
    return this._value;
  }

  _value: any;

  writeValue(value: number): void {
    this._value = value;
    this.onChange(this._value.number);
  }

  private onChange = (value: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
  }
}
