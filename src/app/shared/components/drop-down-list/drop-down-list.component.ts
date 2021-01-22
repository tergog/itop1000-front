import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { NameValueModel } from 'app/shared/models';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownListComponent),
      multi: true
    }
  ]
})

export class DropDownListComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() dataName: string;
  @Input() isEdit: boolean;
  @Input() placeholder: string;
  @ViewChild('data', {static: false}) data: ElementRef;

  public allData: NameValueModel[] = [];
  public availableData$: Subject<NameValueModel[]> = new Subject<NameValueModel[]>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public devProfileService: DevProfileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.devProfileService.getStaticData(this.dataName).subscribe(res => {
      this.allData = res;
      this.availableData$.next(this.filterData(this.allData, this._value));
      this.cdr.detectChanges();
    });
  }

  @Input()
  set value(value: NameValueModel[]) {
    this._value = value;
    this.writeValue(this._value);
  }

  get value(): NameValueModel[] {
    return this._value;
  }

  _value: NameValueModel[];

  writeValue(value: NameValueModel[]): void {
    this._value = value;
  }

  private onChange = (value: number) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  public filterData(allData, currentData): NameValueModel[] {
    const filteredData = allData.filter(staticItem => !currentData.find(currentItem => staticItem.value === currentItem.value));
    return filteredData;
  }

  public onChipSelect(chip): void {
    this._value.push(chip);
    this.availableData$.next(this.filterData(this.allData, this._value));
    this.resetFocus();
  }

  public onChipRemove(chip: NameValueModel): void {
    this._value.splice(this._value.findIndex(item => item.value === chip.value), 1);
    this.availableData$.next(this.filterData(this.allData,  this._value));
  }

  resetFocus(): void {
    this.data.nativeElement.blur();
    setTimeout(() => {
      this.data.nativeElement.focus();
    }, 0);
  }
}
