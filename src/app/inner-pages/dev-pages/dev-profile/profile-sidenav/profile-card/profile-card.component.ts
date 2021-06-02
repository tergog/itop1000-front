import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '../../../../../core/reducers';
import { UserInfo } from '../../../../../shared/models';
import { EDevProfileSections } from '../../dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Output() section = new EventEmitter<EDevProfileSections>();
  public DevProfileSections = EDevProfileSections;
  public userInfo$: Observable<UserInfo>;

  constructor(private store: Store<fromCore.State>, private router: Router) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public onSectionCLick(selectedSection: EDevProfileSections): void {
    this.section.emit(selectedSection);
  }
}
