import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService, NotificationsService } from 'app/shared/services';
import { Job, NotificationMessage } from 'app/shared/models';
import { State } from 'app/core/reducers/index';
import { Store } from '@ngrx/store';
import { GetJobsAction } from 'app/core/client/store/actions';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @Output() isEdit = new EventEmitter<Job>();
  @ViewChild('category', {static: false}) category: ElementRef;
  public form: FormGroup;
  showError: boolean = false;

  constructor(private jobsService: JobsService, private notificationService: NotificationsService, private store: Store<State>, public devProfileService: DevProfileService) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.devProfileService.availableCategories)
    console.log(this.devProfileService.selectedCategories)
  }

  public onPostClick(): void {
    console.log(this.form.value)
    if(this.form.valid) {
      this.jobsService.createJob(this.form.value)
      .subscribe((r) => {
        console.log(r);
        let msg: NotificationMessage = {message: "Added project", type: "success"};
        this.store.dispatch(new GetJobsAction());
        this.notificationService.message.emit(msg);
        this.form.reset();
        this.devProfileService.availableCategories.push(...this.devProfileService.selectedCategories);
        this.devProfileService.selectedCategories = [];
        this.isEdit.emit();
      });
    } else {
      this.showError = true;
    }
  }

  public onCancelClick(): void {
    this.isEdit.emit();
    this.form.reset();
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

  onChipSelect(category) {
    this.devProfileService.selectedCategories.push(category);
    this.devProfileService.availableCategories = this.devProfileService.availableCategories.filter(el => el.value !== category.value);
    this.form.get('categories').patchValue(this.devProfileService.selectedCategories);
    console.log(this.form.value);
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
}
