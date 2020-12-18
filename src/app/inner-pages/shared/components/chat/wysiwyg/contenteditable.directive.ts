import { Directive, ElementRef, forwardRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector:
    '[contenteditable][formControlName],' +
    '[contenteditable][formControl],' +
    '[contenteditable][ngModel]',
  host: {
    '(input)': 'onChange($event.target.innerHTML)',
    '(blur)': 'onTouched()'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ContenteditableControlValueAccessor),
    multi: true,
  }]
})
export class ContenteditableControlValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', value || '');
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}