import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import * as fromDevelopers from 'app/core/developers/store';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import * as fromCore from 'app/core/reducers';
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
export class DropDownListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() parent: FormGroup;
  @Input() dataName: string;
  @Input() isEdit: boolean;
  @Input() placeholder: string;
  @ViewChild('data', {static: false}) data: ElementRef;

  public formControlName: string;

  public allData: NameValueModel[] = [];
  public availableData$: Subject<NameValueModel[]> = new Subject<NameValueModel[]>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private store: Store<fromCore.State>,
    public devProfileService: DevProfileService,
    private developersStore: Store<fromDevelopers.State>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formControlName = this.dataName.toLocaleLowerCase();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.developersStore.select(fromDevelopers[`get${this.dataName}`])
      .pipe(
        filter(res => !!res.length),
        first()
      )
      .subscribe(res => {
        this.allData = res;
        this.availableData$.next(this.filterData(this.allData, this.parent.get(this.formControlName).value));
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
  }

  public filterData(allData, currentData): NameValueModel[] {
    const filteredData = allData.filter(staticItem => !currentData.find(currentItem => staticItem.value === currentItem.value));
    return filteredData;
  }

  public onChipSelect(chip): void {
    this.parent.get(this.formControlName).value.push(chip);
    this.availableData$.next(this.filterData(this.allData, this.parent.get(this.formControlName).value));
    this.resetFocus();
  }

  public onChipRemove(chip: NameValueModel): void {
    this.parent.get(this.formControlName).value
      .splice(this.parent.get(this.formControlName).value
        .findIndex(item => item.value === chip.value), 1);
    this.availableData$.next(this.filterData(this.allData,  this.parent.get(this.formControlName).value));
  }

  resetFocus(): void {
    this.data.nativeElement.blur();
    setTimeout(() => {
      this.data.nativeElement.focus();
    }, 0);
  }
}
