import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';

import { GetJobsAction } from 'app/core/client/store/actions';
import { State } from 'app/core/reducers/index';
import { Job, NameValueModel } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { availableCategories } from 'app/shared/models/dev-profile';


@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss']
})
export class EditJobDialogComponent implements OnInit, OnDestroy {

  @ViewChild('category', {static: false}) category: ElementRef;
  public form: FormGroup;
  public job: Job;
  public errorMessage: string;
  public availableCategories = availableCategories;
  public selectedCategories = [];
  showError: boolean;
  selectedOpt: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<State>,
              private jobService: JobsService,
              private dialogRef: MatDialogRef<EditJobDialogComponent>) { }

  ngOnInit(): void {
    this.job = this.data.job;
    this.initForm();
    this.form.patchValue(this.job);
    this.selectedCategories.push(...this.job.categories);
    for (const category of this.selectedCategories) {
      this.availableCategories = this.availableCategories.filter(el => el.name !== category.name);
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
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
    this.selectedCategories.push(category);
    this.availableCategories = this.availableCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.selectedCategories);
    this.focusReset();
  }

  onChipRemove(category: NameValueModel): void {
    this.selectedCategories = this.selectedCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.selectedCategories);
    this.availableCategories.push(category);
  }

  focusReset(): void {
    this.category.nativeElement.blur();
    setTimeout(() => this.category.nativeElement.focus(), 0)
  }

  onSelect(event: MatSelectChange): void {
    this.form.get('contractType').setValue(event.value);
  }

  ngOnDestroy(): void {

  }
}
