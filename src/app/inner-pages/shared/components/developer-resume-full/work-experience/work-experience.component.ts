import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Developer } from 'app/shared/models';
import { State, getDeveloper } from 'app/core/developers/developers.reducer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { setDeveloper } from '../../../../../core/developers/developers.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit, OnDestroy {

  public developer: Observable<Developer>;
  public projectId: number;

  constructor(
    private store: Store<State>,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.store.select(getDeveloper)
      .subscribe((dev) => {
        console.log(dev);
      });
  }

  ngOnDestroy() {
  }

}
