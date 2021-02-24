import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { interval, Observable } from 'rxjs';

import { State } from 'app/core/developers/store';
import { DevProject } from 'app/shared/models/dev-project.model';
import { DevProjectsService } from 'app/shared/services/dev-projects.service';
import { first } from 'rxjs/operators';

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
  public project$: Observable<DevProject>;
  public projectId: string;
  public projectImageId = 0;
  public interval: Observable<any>;
  private carousel: any;

  constructor(
    private devProjectService: DevProjectsService,
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.devProjectService.getProjectById(this.projectId).pipe(first()).subscribe(res => this.project = res);
    this.interval = interval(4000);
    this.carouselStart();
  }

  public carouselStep(isNext: boolean): void {
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

  public carouselStart(): void {
    this.carousel = this.interval
      .subscribe(() => {
      this.projectImageId !== this.project.images.length - 1
        ? this.projectImageId = ++this.projectImageId
        : this.projectImageId = 0;
    });
  }

  public carouselStop(): void {
    this.carousel.unsubscribe();
  }

}
