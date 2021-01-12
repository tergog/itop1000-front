import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { JobsService, NotificationsService } from 'app/shared/services';
import { Job, NameValueModel, NotificationMessage } from 'app/shared/models';
import { State } from 'app/core/reducers/index';
import { GetJobsAction } from 'app/core/client/store/actions';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})

export class CreateJobComponent implements OnInit, OnDestroy {

  @Output() isEdit = new EventEmitter<Job>();
  @ViewChild('category', {static: false}) category: ElementRef;
  public form: FormGroup;
  showError: boolean;

  constructor(
    private jobsService: JobsService,
    private notificationService: NotificationsService,
    private store: Store<State>,
    public devProfileService: DevProfileService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onPostClick(): void {
    if (!this.form.valid) {
      this.showError = true;
      return
    }
    this.jobsService.createJob(this.form.value).pipe(untilDestroyed(this))
    .subscribe(() => {
      let msg: NotificationMessage = {message: "Added project", type: "success"};
      this.store.dispatch(new GetJobsAction());
      this.notificationService.message.emit(msg);
      this.form.reset();
      this.devProfileService.availableCategories.push(...this.devProfileService.selectedCategories);
      this.devProfileService.selectedCategories = [];
      this.isEdit.emit();
    });
  }

  public onCancelClick(): void {
    this.isEdit.emit();
    this.form.reset();
    this.devProfileService.availableCategories.push(...this.devProfileService.selectedCategories);
    this.devProfileService.selectedCategories = [];
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

  onChipSelect(category: NameValueModel): void {
    this.devProfileService.selectedCategories.push(category);
    this.devProfileService.availableCategories = this.devProfileService.availableCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
    this.focusReset();
  }

  onChipRemove(category: NameValueModel): void {
    this.devProfileService.availableCategories.push(category);
    this.devProfileService.selectedCategories = this.devProfileService.selectedCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
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
