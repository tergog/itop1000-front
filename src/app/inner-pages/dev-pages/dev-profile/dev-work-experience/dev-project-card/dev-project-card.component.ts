import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models/name-value.model';

@Component({
  selector: 'app-dev-project-card',
  templateUrl: './dev-project-card.component.html',
  styleUrls: ['./dev-project-card.component.scss']
})
export class DevProjectCardComponent implements OnInit {

  public isEdit = false;
  public selectedTechnologies = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() project: DevProject;
  @Input() availableTechnologies;

  @Output() removeTechnology = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick() {
    this.isEdit = !this.isEdit;
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    this.save.emit();
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.removeTechnology.emit(technology);
  }

  public onTechnologySelect({ option }): void {
    this.availableTechnologies = this.availableTechnologies.filter(technology => technology.value !== option.value.value);
    this.selectedTechnologies.push(option.value);
  }
}
