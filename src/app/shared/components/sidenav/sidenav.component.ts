import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input,
  Output,
  ViewChild
} from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';
import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';
import { EClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';


@Component({
  selector: 'app-dev-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('defaultActive') defaultActive;
  @Input() userType: string;
  @Output() section = new EventEmitter<EDevProfileSections | EClientProfileSections>();

  domPortal: DomPortal<any>;

  public devProfileSections = EDevProfileSections;
  public devActiveSection: EDevProfileSections | EClientProfileSections =  EDevProfileSections.ApprovedProjects;

  public clientProfileSections = EClientProfileSections;
  public clientActiveSection: EDevProfileSections | EClientProfileSections =  EClientProfileSections.PostedJobs;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.domPortal = new DomPortal(this.defaultActive);
    this.cdr.detectChanges();
  }

  public onSectionCLick(selectedSection: EDevProfileSections | EClientProfileSections, elem?): void {
    this.domPortal = new DomPortal(elem);

    if (this.userType === 'developer') {
      this.devActiveSection = selectedSection;
    } else {
      this.clientActiveSection = selectedSection;
    }

    this.section.emit(selectedSection);
  }

}
