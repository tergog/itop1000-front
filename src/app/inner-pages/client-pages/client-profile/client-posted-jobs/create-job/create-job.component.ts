import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobsService } from 'app/shared/services';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  public form: FormGroup;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onPostClick(): void {
    this.jobsService.createJob(this.form.value)
      .subscribe(r => console.log(r));
  }

  public onCancelClick(): void {

  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', []),
      description: new FormControl('', []),
      categories: new FormControl('', []),
      requirements: new FormControl('', []),
      duration: new FormControl('', []),
      price: new FormControl('', []),
    })
  }

}
