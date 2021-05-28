import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { bufferTime, tap } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { Developer } from 'app/shared/models';
import { ResumeService } from 'app/shared/services/resume.service';
import { getDeveloper, State } from 'app/core/developers/store';
import { setDeveloper } from 'app/core/developers/store/developers.actions';
import { DevProjectsService } from 'app/shared/services/dev-projects.service';
import { DevProject } from 'app/shared/models/dev-project.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export enum EDeveloperResumeSections {
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
export class DeveloperResumeFullComponent implements OnInit, OnDestroy {
  public developer$: Observable<Developer>;
  public DeveloperResumeSections = EDeveloperResumeSections;
  public activeSection = EDeveloperResumeSections.ProfessionalSkills;
  public projects$: Observable<DevProject[]>;
  public projects: DevProject[];

  public projectCounter = 0;

  private inViewportChange;

  constructor(
    private devProjectService: DevProjectsService,
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {  }

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper).pipe(tap((dev: Developer) => {
      if (!dev) {
        this.store.dispatch(setDeveloper({id: this.route.snapshot.params.id}));
      }
    }));
    this.projects$ = this.devProjectService.getProjectsById(this.route.snapshot.params.id)
      .pipe(
        tap(res => this.projects = res)
      );
    this.projectCounter = 3;

    this.inViewportChange = new Subject<{ isInViewport: boolean, section: EDeveloperResumeSections }>()
      .pipe(bufferTime(300));

    // this.inViewportChange.subscribe((sections) => console.log(sections));
  }

  ngOnDestroy() {
  }

  onShowMoreClick(dev: Developer): void {
    this.projectCounter < this.projects.length
      ? this.projectCounter += 3
      : this.projectCounter = 3;
  }

  public onSectionCLick(selectedSection: EDeveloperResumeSections, element: HTMLElement): void {
    this.activeSection = selectedSection;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  public onWorkExperienceClick(id: string, projectId: string): void {
    this.router.navigate([`in/c/search-developers/${ id }/project/${ projectId }`]);
  }

  public onMessageClick(id: string): void {
    this.router.navigate([`in/c/chat/${id}`]);
  }

  public inViewport(isInViewport: boolean, section: EDeveloperResumeSections): void {
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

  async exportResume(dev) {
    const documentDefinition = await this.resumeService.getDocumentDefinition(dev);
    pdfMake.createPdf(documentDefinition).download('Export CV As PDF');
  }
}
