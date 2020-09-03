import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Developer } from 'app/shared/models';
import { DevProjectModel } from 'app/shared/models/dev-project.model';
import { State, getDeveloper } from 'app/core/reducers';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit, OnDestroy {

  public developer$: Observable<Developer>;
  public projects: DevProjectModel[];
  devSub: Subscription;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper);
    this.devSub = this.developer$.subscribe((data) => this.projects = data.projects);
  }

  ngOnDestroy(): void {
    this.devSub.unsubscribe();
  }

}
