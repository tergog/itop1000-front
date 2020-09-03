import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Developer } from 'app/shared/models';
import { State, getDeveloper } from 'app/core/reducers';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  public developer$: Observable<Developer>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper);
  }

}
