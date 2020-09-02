import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, getDevelopers } from 'app/core/reducers';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  public developers$: Observable<any>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.developers$ = this.store.select(getDevelopers);
  }

}
