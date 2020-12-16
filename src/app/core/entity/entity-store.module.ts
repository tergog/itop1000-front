import { EntityDataService } from '@ngrx/data';
import { JobDataService } from 'app/core/services/job.service';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        JobDataService,
    ]
})
export class EntityStoreModule {
    constructor(
        entityDataService: EntityDataService,
        JobDataService: JobDataService
    ) {
        entityDataService.registerService('Job', JobDataService);
    }
}