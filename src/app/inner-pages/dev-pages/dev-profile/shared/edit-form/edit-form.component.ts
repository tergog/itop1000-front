import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { xorBy } from 'lodash.xorby';
import * as jwtDecode from 'jwt-decode';

import { TOKEN } from 'app/constants/constants';
import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models/user-info.model';
import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models/name-value.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  public form: FormGroup;


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() sectionName: string;
  @Input() isEdit: boolean;
  @Output() editToggle = new EventEmitter();

  constructor(
    public devProfileService: DevProfileService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
    .pipe(first())
    .subscribe((userInfo: UserInfo) => {
      if (userInfo.token) {
        userInfo = this.devProfileService.decodeToken(userInfo.token);
      }

      this.devProfileService.devProperties = userInfo.devProperties;
      this.updateChips(this.devProfileService.devProperties);
    });
  }

  private initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      timezone: new FormControl('', []),
      categories: new FormControl('', []),
      skills: new FormControl('', []),
      // languages: new FormControl('', []),
      title: new FormControl('', []),
      description: new FormControl('', []),
      technologies: new FormControl([], []),
      link: new FormControl('', []),
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  onEditClick() {
    this.editToggle.emit();
  }

  onCancelClick() {
    // this.isEdit = !this.isEdit;
    console.log('cancel');

  }

  onSaveClick() {
    this.devProfileService.devProperties = {
      skills: this.devProfileService.selectedSkills,
      categories: this.devProfileService.selectedCategories,
      // softSkills: this.devProfileService.selectedSoftSkills,
      // languages: this.devProfileService.selectedLanguages,
      // projects: this.devProfileService.devProperties.projects
    };
    this.disableEmptyFields();
    this.devProfileService.onSaveClick(this.form.value);
    debugger;
    this.isEdit = false;

  }

  public onChipSelect(chip, selectedChips, availableChips): void {
    this.devProfileService[availableChips] = this.devProfileService[availableChips].filter(ch => ch.value !== chip.value);
    this.devProfileService[selectedChips].push(chip);
  }

  public onChipRemove(chip: NameValueModel, selectedChips, availableChips): void {
    this.devProfileService[selectedChips] = this.devProfileService[selectedChips].filter(item => item.value !== chip.value);
    this.devProfileService[availableChips].push(chip);
  }

  private updateChips(devProperties) {
    // selectedChips = [ ...chips ] || [];
    // availableChips = xorBy(selectedChips, availableChips);

    this.devProfileService.selectedCategories = [...devProperties.categories] || [];
    this.devProfileService.selectedSkills = [...devProperties.skills] || [];
    // this.devProfileService.selectedSoftSkills = [...devProperties.softSkills] || [];
    // this.devProfileService.selectedLanguages = [...devProperties.languages] || [];
    // devProperties.projects.forEach((project) => this.devProfileService.selectedTechnologies = project.technologies);


    this.devProfileService.availableCategories = this.devProfileService.availableCategories
      .filter(
        (category) => !this.devProfileService.selectedCategories.find(selectedCat => selectedCat.value === category.value)
      );

    this.devProfileService.availableSkills = this.devProfileService.availableSkills
      .filter(
        (skill) => !this.devProfileService.selectedSkills.find(selectedSkill => selectedSkill.value === skill.value)
      );
  }

}
