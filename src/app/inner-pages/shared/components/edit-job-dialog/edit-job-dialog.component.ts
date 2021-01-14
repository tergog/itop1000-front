import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';

import { GetJobsAction } from 'app/core/client/store/actions';
import { State } from 'app/core/reducers/index';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { Job, NameValueModel } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { Observable, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import * as fromDevelopers from 'app/core/developers/store';


@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss']
})
export class EditJobDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('category', {static: false}) category: ElementRef;
  public form: FormGroup;
  public job: Job;
  public errorMessage: string;
  showError: boolean;
  selectedOpt: string;

  public allCategories: NameValueModel[] = [];
  public availableCategories: Subject<NameValueModel[]> = new Subject<NameValueModel[]>();
  public availableCategories$: Observable<NameValueModel[]> = this.availableCategories.asObservable().pipe(
    map(val => this.allCategories.filter(category => !val.find(item => item.value === category.value))));

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<State>,
              private jobService: JobsService,
              public devProfileService: DevProfileService,
              private dialogRef: MatDialogRef<EditJobDialogComponent>,
              private developersStore: Store<fromDevelopers.State>,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.job = this.data.job;
    this.initForm();
    this.form.patchValue(this.job);
    this.devProfileService.selectedCategories.push(...this.job.categories);
  }
  ngAfterViewInit() {
    this.developersStore.select(fromDevelopers.getCategories)
      .pipe(
        filter(res => !!res.length),
        first()
      )
      .subscribe(res => {
        this.allCategories = res;
        this.availableCategories.next(this.devProfileService.selectedCategories);
        this.cdr.detectChanges();
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      requirements: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      contractType: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      address: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required])
    });
  }

  onPostClick(): void {
    if (!this.form.valid) {
      this.showError = true;
      return;
    }
    this.jobService.updateJob(this.job.id, this.form.value)
    .pipe(untilDestroyed(this))
    .subscribe(
      () => {
        this.dialogRef.close('Job updated successfully');
        this.store.dispatch(new GetJobsAction());
      },
      error => this.errorMessage = error.message);
  }

  onChipSelect(category: NameValueModel): void {
    this.devProfileService.selectedCategories.push(category);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
    this.availableCategories.next(this.devProfileService.selectedCategories);
    this.focusReset();
  }

  onChipRemove(category: NameValueModel): void {
    this.devProfileService.selectedCategories = this.devProfileService.selectedCategories.filter(el => el.value !== category.value);
    this.availableCategories.next(this.devProfileService.selectedCategories);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
  }

  focusReset(): void {
    this.category.nativeElement.blur();
    setTimeout(() => this.category.nativeElement.focus(), 0);
  }

  onSelect(event: MatSelectChange): void {
    this.form.get('contractType').setValue(event.value);
  }

  ngOnDestroy(): void {
    this.devProfileService.selectedCategories = [];
  }
}
