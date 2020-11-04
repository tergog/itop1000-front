import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { Developer } from 'app/shared/models';
import { State, getDeveloper } from 'app/core/developers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit, OnDestroy, OnChanges {

  public developer: Developer;
  public projectId: number;

  constructor(
    private store: Store<State>,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.store.select(getDeveloper).subscribe(developer => this.developer = developer);
    console.log(this.developer);
  }

  ngOnChanges(): void {
    debugger;
    console.log(this.developer);
  }

  ngOnDestroy(): void {
  }

}
