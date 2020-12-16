import { Component, OnInit } from '@angular/core';
import { JobDataService } from 'app/core/services/job.service';
import { JobService } from 'app/core/services/job-data.service'
import { Job } from 'app/shared/models/job.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {



  constructor() { 
  }
  
  ngOnInit() {
    //this.jobService.load();
    
    //this.jobService.getByKey(0).subscribe(res => console.log(res));
    //this.jobService.add(this.job).subscribe(res => console.log(res));
  }

}
