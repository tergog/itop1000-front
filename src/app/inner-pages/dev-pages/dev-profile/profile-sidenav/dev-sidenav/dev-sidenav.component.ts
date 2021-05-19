import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EDevProfileSections} from '../../dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-dev-sidenav',
  templateUrl: './dev-sidenav.component.html',
  styleUrls: ['./dev-sidenav.component.scss']
})
export class DevSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<EDevProfileSections>();

  public DevProfileSections = EDevProfileSections;
  public activeSection: EDevProfileSections = EDevProfileSections.ContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: EDevProfileSections): void {
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
