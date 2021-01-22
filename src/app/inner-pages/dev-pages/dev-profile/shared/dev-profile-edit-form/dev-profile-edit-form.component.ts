import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import * as fromCore from 'app/core/reducers';
import { NameValueModel, UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-profile-edit-form',
  templateUrl: './dev-profile-edit-form.component.html',
  styleUrls: ['./dev-profile-edit-form.component.scss']
})

export class DevProfileEditFormComponent implements OnInit {

  @Input() sectionName: string;
  @Input() isEdit: boolean;
  @Output() editToggle = new EventEmitter();
  @ViewChild('category', {static: false}) category: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;

  public form: FormGroup;
  public allCategories: NameValueModel[] = [];
  public allSkills: NameValueModel[] = [];

  constructor(
    public devProfileService: DevProfileService,
    private store: Store<fromCore.State>,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        this.devProfileService.devProperties = userInfo.devProperties ? userInfo.devProperties : {};
        this.form.get('skills').setValue([...this.devProfileService.devProperties.skills]);
        this.form.get('categories').setValue([...this.devProfileService.devProperties.categories]);
      });
  }

  public onEditClick(): void {
    this.editToggle.emit();
  }

  public onSaveClick(): void {
    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      skills: this.form.get('skills').value,
      categories: this.form.get('categories').value
    };
    this.disableEmptyFields();
    this.devProfileService.onSaveClick({ devProperties: this.devProfileService.devProperties });
    this.isEdit = false;
  }

  private initForm() {
    this.form = new FormGroup({
      categories: new FormControl([], []),
      skills: new FormControl([], []),
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }
}
