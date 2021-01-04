import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserInfo } from 'app/shared/models';
import { Store } from '@ngrx/store';
import * as fromCore from 'app/core/reducers';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dev-want-to-learn',
  templateUrl: './dev-want-to-learn.component.html',
  styleUrls: ['./dev-want-to-learn.component.scss']
})
export class DevWantToLearnComponent implements OnInit {
  public description = '';
  public disabled = true;
  public developer: UserInfo;

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService
  ) {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        this.developer = JSON.parse(JSON.stringify(userInfo));
        this.description = userInfo.devProperties.description;
      });
  }

  onEditClick(): void {
    this.disabled = !this.disabled;
  }

  onSaveClick(): void {
    this.onEditClick();
    if (this.developer.devProperties.description !== this.description) {
      this.developer.devProperties.description = this.description;
      this.devProfileService.onSaveClick(this.developer);
    }
  }

}
