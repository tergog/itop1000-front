import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-section-header',
  templateUrl: './profile-section-header.component.html',
  styleUrls: ['./profile-section-header.component.scss']
})
export class ProfileSectionHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() canEdit = true;
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onEditClick(): void {
    this.edit.emit();
  }

}
