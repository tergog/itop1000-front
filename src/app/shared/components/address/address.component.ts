import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements OnInit, ControlValueAccessor {

  @ViewChild('placesRef') placesRef : GooglePlaceDirective;
  @Input('currentAddress') currentAddress: string;

  ngOnInit(): void {
  }

  public handleAddressChange(address: Address) {
    this.writeValue(address.formatted_address);
  }

  private onChange = (address: string) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (address: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(address: string): void {
    this.currentAddress = address;
    this.onChange(this.currentAddress);
  }
}
