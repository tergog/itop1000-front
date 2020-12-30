import {Component, OnInit, Renderer2, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {bufferTime} from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {Developer} from 'app/shared/models';
import {getDeveloper, State} from 'app/core/developers';
import {setDeveloper} from 'app/core/developers/developers.actions';
import {ResumeService} from '../../../../shared/services/resume.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
export class DeveloperResumeFullComponent implements OnInit, OnDestroy {
  public developer$: Observable<Developer>;
  public DeveloperResumeSections = DeveloperResumeSections;
  public activeSection = DeveloperResumeSections.ProfessionalSkills;
  developer: Developer;
  public projectCounter = 0;

  private inViewportChange;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private resumeService: ResumeService) {
  }

  ngOnInit(): void {
    this.store.select(getDeveloper).pipe(untilDestroyed(this))
      .subscribe((dev: Developer) => {
          if (!dev) {
            this.store.dispatch(setDeveloper({id: this.route.snapshot.params.id}));
          } else {
            this.developer = dev;
            this.developer$ = this.store.select(getDeveloper);
          }
        }
      );

    this.projectCounter = 3;

    this.inViewportChange = new Subject<{ isInViewport: boolean, section: DeveloperResumeSections }>()
      .pipe(bufferTime(300));

    // this.inViewportChange.subscribe((sections) => console.log(sections));
  }

  ngOnDestroy() {

  }

  onShowMoreClick(): void {
    this.developer$.pipe(untilDestroyed(this))
      .subscribe(dev => this.projectCounter < dev.devProperties.projects.length
        ? this.projectCounter += 3
        : this.projectCounter = 3
      );
  }


  public onSectionCLick(selectedSection: DeveloperResumeSections, element: HTMLElement): void {
    this.activeSection = selectedSection;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  public onWorkExperienceClick(id: string, projectId: number): void {
    this.router.navigate([`in/c/search-developers/${id}/project/${projectId}`]);
  }

  public onMessageClick(): void {
    this.router.navigate(['in/c/chat']);
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

  async exportResume() {
    const documentDefinition = await this.resumeService.getDocumentDefinition(this.developer);
    pdfMake.createPdf(documentDefinition).download('Export CV As PDF');
  }
}
