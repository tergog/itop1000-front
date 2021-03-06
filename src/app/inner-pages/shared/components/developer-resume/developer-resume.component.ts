import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Developer } from 'app/shared/models';

@Component({
  selector: 'app-developer-resume',
  templateUrl: './developer-resume.component.html',
  styleUrls: ['./developer-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperResumeComponent {

  @Input() developer: Developer;
  @Output() profile = new EventEmitter<string>();

  constructor() { }

  public onProfileClick(): void {
    this.profile.emit(this.developer.id);
  }

}
