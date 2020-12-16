import { EntityMetadataMap } from '@ngrx/data';
import { Job } from 'app/shared/models';
 
const entityMetadata: EntityMetadataMap = {
  Job: {
    selectId: (job: Job) => job.id
  },
  User: {}
};


export const pluralNames = { Job: 'Jobs', User: 'Users' };
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};