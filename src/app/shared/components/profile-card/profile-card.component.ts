import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCore from 'app/core/reducers';
import { UserInfo } from 'app/shared/models';
import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Output() section = new EventEmitter<EDevProfileSections>();
  public DevProfileSections = EDevProfileSections;
  public userInfo$: Observable<UserInfo>;

  constructor(private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public onSectionCLick(selectedSection: EDevProfileSections): void {
    this.section.emit(selectedSection);
  }
}
