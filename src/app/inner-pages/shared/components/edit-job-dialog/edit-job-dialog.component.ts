import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Job } from 'app/shared/models';
import { JobsService } from 'app/shared/services';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss']
})
export class EditJobDialogComponent implements OnInit {

  public form: FormGroup;
  public job: Job;
  public errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private jobService: JobsService,
              private dialogRef: MatDialogRef<EditJobDialogComponent>) { }

  ngOnInit(): void {
    this.job = this.data.job;
    this.initForm();
    this.form.patchValue(this.job);
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


  onPostClick() {
    this.jobService.updateJob(this.job.id, this.form.value)
      .subscribe(
        () => this.dialogRef.close('Job updated successfully'),
        error => this.errorMessage = error.message);
  }
}
