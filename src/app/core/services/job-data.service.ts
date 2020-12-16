import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Job } from 'app/shared/models/job.model';
 
@Injectable({ providedIn: 'root' })
export class JobService extends EntityCollectionServiceBase<Job> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Job', serviceElementsFactory);
  }
}