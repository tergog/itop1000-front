import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @HostBinding('class.inner') get valid() { return this.type === 'inner' }
  @Input() type: string;
  @Input() placeholder;
  @Input() disabled: boolean;
  @Input() isHiddenPassword: boolean;
  @Output() enterKey = new EventEmitter();
  @Output() onFocusField = new EventEmitter();

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

  public onTouched = () => { };

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public enterKeyClick(): void {
    this.enterKey.emit();
  }

  public onFocus(): void {
    this.onFocusField.emit();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
