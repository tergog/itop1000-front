import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';
import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-dev-sidenav',
  templateUrl: './dev-sidenav.component.html',
  styleUrls: ['./dev-sidenav.component.scss']
})
export class DevSidenavComponent implements AfterViewInit {
  @ViewChild('defaultActive') defaultActive;
  @Output() section = new EventEmitter<EDevProfileSections>();

  domPortal: DomPortal<any>;

  public DevProfileSections = EDevProfileSections;
  public activeSection: EDevProfileSections =  EDevProfileSections.ApprovedProjects;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.domPortal = new DomPortal(this.defaultActive);
    this.cdr.detectChanges();
  }

  public onSectionCLick(selectedSection: EDevProfileSections, elem?): void {
    this.domPortal = new DomPortal(elem);
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
