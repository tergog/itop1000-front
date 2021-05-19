import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DomPortal} from '@angular/cdk/portal';
import {EDevProfileSections} from '../../dev-profile-sections/dev-profile-sections.enum';


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
  public activeSection: EDevProfileSections = EDevProfileSections.ContactInfo;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.domPortal = new DomPortal(this.defaultActive);
    this.cdr.detectChanges();
  }

  public onSectionCLick(selectedSection: EDevProfileSections, elem?): void {
    this.domPortal = new DomPortal<any>(elem);
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
