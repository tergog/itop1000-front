import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

import { State, getDeveloper } from 'app/core/developers';
import { DevProject } from 'app/shared/models/dev-project.model';
import { setDeveloper } from 'app/core/developers/developers.actions';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('1500ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class WorkExperienceComponent implements OnInit {

  public project: DevProject;
  public projectId: number;
  public projectImageId = 0;
  public carousel: any;

  constructor(
    private store: Store<State>,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.store.select(getDeveloper).subscribe(developer => developer
      ? this.project = developer.devProperties.projects[this.projectId]
      : this.store.dispatch(setDeveloper({id: this.route.snapshot.params.id})));

    this.carouselStart();
  }

  public carouselStep(isNext: boolean) {
    if (!isNext && this.projectImageId === 0) {
      this.projectImageId = this.project.images.length - 1;
      return;
    }
    if (isNext && this.projectImageId === this.project.images.length - 1) {
      this.projectImageId = 0;
      return;
    }
    this.projectImageId = (isNext ? ++this.projectImageId : --this.projectImageId);
  }

  public carouselStart() {
    this.carousel = setInterval(() => {
      console.log(this.projectImageId, this.project.images.length);

      this.projectImageId !== this.project.images.length - 1
        ? this.projectImageId = ++this.projectImageId
        : this.projectImageId = 0;

      console.log(this.projectImageId);
    }, 4000);
  }

  public carouselStop() {
    clearInterval(this.carousel);
  }

}
