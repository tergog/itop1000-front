import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-input-test',
  templateUrl: './input-test.component.html',
  styleUrls: ['./input-test.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTestComponent),
      multi: true
    }
  ]
})
export class InputTestComponent implements OnInit, ControlValueAccessor {

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
    this._value = value;
    // console.log(value)
    this.writeValue(value);
  }

  get value(): any {
    return this._value;
  }

  _value: any;

  writeValue(value: number): void {
    // console.log(this.value)
    this.onChange(this.value);
  }

  private onChange = (value: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    // this.onTouched = fn;
  }

  // public enterKeyClick(): void {
  //   this.enterKey.emit();
  // }
  //
  // public onFocus(): void {
  //   this.onFocusField.emit();
  // }
}
