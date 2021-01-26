import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit, Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { GetJobsAction } from 'app/core/client/store/actions';
import { State } from 'app/core/reducers/index';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { Job, NameValueModel } from 'app/shared/models';
import { JobsService } from 'app/shared/services';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss']
})
export class EditJobDialogComponent implements OnInit, OnDestroy {

  @Output() isEdit = new EventEmitter<Job>();
  public form: FormGroup;
  public job: Job;
  public errorMessage: string;
  showError: boolean;
  selectedOpt: string;

  public ngUnsubscribe$ = new Subject<void>();
  public allCategories$: Observable<NameValueModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<State>,
              private jobService: JobsService,
              public devProfileService: DevProfileService,
              private dialogRef: MatDialogRef<EditJobDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.job = cloneDeep(this.data.job);
    this.initForm();
    this.form.patchValue(this.job);
    this.allCategories$ = this.devProfileService.getStaticData('Categories');
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], []),
      requirements: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      contractType: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      address: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required])
    });
  }

  onPostClick(): void {
    if (!this.form.value.categories.length) {
      this.showError = true;
      return;
    }

    if (!this.form.valid) {
      this.showError = true;
      return;
    }

    this.jobService.updateJob(this.job.id, this.form.value)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      () => {
        this.dialogRef.close('Job updated successfully');
        this.store.dispatch(new GetJobsAction());
      },
      error => this.errorMessage = error.message);
  }

  onSelect(event: MatSelectChange): void {
    this.form.get('contractType').setValue(event.value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
