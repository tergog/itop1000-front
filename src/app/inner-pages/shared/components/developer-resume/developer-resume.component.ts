import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Developer } from 'app/shared/models';

@Component({
  selector: 'app-developer-resume',
  templateUrl: './developer-resume.component.html',
  styleUrls: ['./developer-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperResumeComponent implements OnInit {

  @Input() developer: Developer;
  @Output() profile = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  public onProfileClick(): void {
    this.profile.emit(this.developer.id);
  }

  ngOnInit(): void {
    console.log(this.developer);
  }

  openChatWithDev(): void {
    this.router.navigate([`in/c/chat/${this.developer.id}`]);
  }

}
