import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jwtDecode from 'jwt-decode';

import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.scss']
})
export class DevProfileComponent implements OnInit {

  public selectedSection: EDevProfileSections = EDevProfileSections.ContactInfo;

  constructor(
    // private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {

  }

  public onSectionSelect(selectedSection: EDevProfileSections): void {
    this.selectedSection = selectedSection;
  }

}
