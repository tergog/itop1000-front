import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GetJobsAction } from 'app/core/client/store/actions';

import { getUserInfo, State } from 'app/core/reducers/index';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { Job, UserInfo } from 'app/shared/models';
import { JobsService } from 'app/shared/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

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
  showError: boolean = false;
  selectedOpt: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<State>,
              private jobService: JobsService,
              public devProfileService: DevProfileService,
              private dialogRef: MatDialogRef<EditJobDialogComponent>) { }

  ngOnInit(): void {
    this.job = this.data.job;
    this.initForm();
    this.form.patchValue(this.job);
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
    console.log(this.form.value);
    if(this.form.valid) {
      this.jobService.updateJob(this.job.id, this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => { 
          this.dialogRef.close('Job updated successfully');
          this.store.dispatch(new GetJobsAction());
        },
        error => this.errorMessage = error.message);
    } else {
      this.showError = true;
    }
  }

  onChipSelect(category) {
    this.devProfileService.selectedCategories.push(category);
    this.devProfileService.availableCategories = this.devProfileService.availableCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
    this.focusReset();
  }
  
  onChipRemove(category) {
    this.devProfileService.availableCategories.push(category);
    this.devProfileService.selectedCategories = this.devProfileService.selectedCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
  }

  focusReset() {
    this.category.nativeElement.blur();
    setTimeout(() => this.category.nativeElement.focus(), 0)
  }

  onSelect(event) {
    this.form.get('contractType').setValue(event.value);
  }

  ngOnDestroy() {

  }
}
