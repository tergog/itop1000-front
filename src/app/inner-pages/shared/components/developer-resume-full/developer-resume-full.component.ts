import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { buffer, bufferTime, debounceTime, take, tap } from 'rxjs/operators';

import { Developer } from 'app/shared/models';
import { getDeveloper, State } from 'app/core/reducers';

export enum DeveloperResumeSections {
  ProfessionalSkills,
  WorkExperience,
  Education,
  SoftSkillsLanguages,
  IWantToLearn,
  Certificates,
  Reviews,
}

@Component({
  selector: 'app-developer-resume-full',
  templateUrl: './developer-resume-full.component.html',
  styleUrls: ['./developer-resume-full.component.scss'],
})
export class DeveloperResumeFullComponent implements OnInit {
  public developer$: Observable<Developer>;
  public DeveloperResumeSections = DeveloperResumeSections;
  public activeSection = DeveloperResumeSections.ProfessionalSkills;
  private inViewportChange;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper);

    this.inViewportChange = new Subject<{ isInViewport: boolean, section: DeveloperResumeSections }>()
      .pipe(bufferTime(300));

    this.inViewportChange.subscribe((sections) => console.log(sections));
  }

  public onSectionCLick(selectedSection: DeveloperResumeSections, element: HTMLElement): void {
    this.activeSection = selectedSection;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  public inViewport(isInViewport: boolean, section: DeveloperResumeSections): void {
    /*console.log(isInViewport)
    if (isInViewport) {
      this.activeSection = section;
    }
    this.inViewportChange.next({ isInViewport, section });*/
  }

  createArrayFromProgress(progress: number, fullProgress: number): boolean[] {
    const arr = Array(progress).fill(true);
    for (let i = 0; i < fullProgress - progress; i++) {
      arr.push(false);
    }

    return arr;
  }
}
