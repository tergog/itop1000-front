import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { AddressComponent } from '../address/address.component';

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

export class PhoneComponent implements  OnInit, ControlValueAccessor{
    @Input('phone') phone: string;

    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    // phoneForm = new FormGroup({
    //   phone: new FormControl(undefined, [Validators.required])
    // });

    changePreferredCountries() {
      this.preferredCountries = [CountryISO.India, CountryISO.Canada];
    }

    ngOnInit() {

    }

    private onChange = (phone: string) => {
      console.log(phone);
    }
    private onTouched = () => {};

    public registerOnChange(fn: (phone: string) => void): void {
      this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }

    public writeValue(phone: string): void {
      this.onChange(phone);
    }
}
