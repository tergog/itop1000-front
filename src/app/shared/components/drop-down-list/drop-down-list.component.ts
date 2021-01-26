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

  @Input() isEdit: boolean;
  @Input() placeholder: string;
  @Input() allData: any;
  @ViewChild('data', { static: false }) data: ElementRef;
  public availableData$: Subject<NameValueModel[]> = new Subject<NameValueModel[]>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  value: NameValueModel[];

  constructor(
    public devProfileService: DevProfileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.availableData$.next(this.filterData(this.allData, this.value));
    this.cdr.detectChanges();
  }

  writeValue(value: NameValueModel[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  public filterData(allData, currentData): NameValueModel[] {
    return allData.filter(staticItem => !currentData.find(currentItem => staticItem.value === currentItem.value));
  }

  public onChipSelect(chip): void {
    this.value.push(chip);
    this.availableData$.next(this.filterData(this.allData, this.value));
    this.resetFocus();
  }

  public onChipRemove(chip: NameValueModel): void {
    this.value.splice(this.value.findIndex(item => item.value === chip.value), 1);
    this.availableData$.next(this.filterData(this.allData,  this.value));
  }

  resetFocus(): void {
    this.data.nativeElement.blur();
    setTimeout(() => {
      this.data.nativeElement.focus();
    }, 0);
  }
}
