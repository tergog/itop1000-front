import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobsService, NotificationsService } from 'app/shared/services';
import { Job, NotificationMessage } from 'app/shared/models';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @Output() isEdit = new EventEmitter<Job>();
  public form: FormGroup;

  constructor(private jobsService: JobsService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onPostClick(): void {
    this.jobsService.createJob(this.form.value)
      .subscribe((r) => {
        console.log(r);
        let msg: NotificationMessage = {message: "Added project", type: "success"}
        this.notificationService.message.emit(msg);
        this.form.reset();
        this.isEdit.emit()
      });
  }

  public onCancelClick(): void {
    this.isEdit.emit();
    this.form.reset();
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', []),
      description: new FormControl('', []),
      categories: new FormControl('', []),
      requirements: new FormControl('', []),
      duration: new FormControl('', []),
      price: new FormControl('', []),
      country: new FormControl('', []),
      city: new FormControl('', []),
      company: new FormControl('', []),
    });
  }

}
