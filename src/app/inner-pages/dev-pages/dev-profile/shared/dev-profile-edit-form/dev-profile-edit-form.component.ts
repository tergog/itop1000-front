import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { EDevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models/user-info.model';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NameValueModel } from 'app/shared/models/name-value.model';
import {Observable} from 'rxjs';

export enum SelectedChips {
  Category = 'selectedCategories',
  Skill = 'selectedSkills'
};

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

  selectedChip = SelectedChips;

  public form: FormGroup;
  public DevProfileSectionNames = EDevProfileSectionNames;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public availableCategoriesObservable: Observable<any>;
  public availableSkillsObservable: Observable<any>;

  constructor(
    public devProfileService: DevProfileService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        this.devProfileService.devProperties = userInfo.devProperties ? userInfo.devProperties : {};
        this.updateChips(this.devProfileService.devProperties);
      });
  }

  public onEditClick(): void {
    this.editToggle.emit();
  }

  public onCancelClick(): void {
    // this.isEdit = !this.isEdit;
    console.log('cancel');
  }

  public onSaveClick(): void {
    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      skills: this.devProfileService.selectedSkills,
      categories: this.devProfileService.selectedCategories,
      // softSkills: this.devProfileService.selectedSoftSkills,
      // languages: this.devProfileService.selectedLanguages,
    };
    this.disableEmptyFields();
    this.devProfileService.onSaveClick({devProperties: this.devProfileService.devProperties});
    this.isEdit = false;
  }

  public onChipSelect(chip, selectedChips, availableChips): void {
    this.devProfileService[availableChips] = this.devProfileService[availableChips].filter(ch => ch.value !== chip.value);
    this.devProfileService[selectedChips].push(chip);
    this.resetFocus(selectedChips);
  }

  resetFocus(selectedChips: SelectedChips): void {
    const element = selectedChips === SelectedChips.Category ? this.category : this.skills;
    element.nativeElement.blur();
    setTimeout(() => { element.nativeElement.focus()}, 0);
  }

  public onChipRemove(chip: NameValueModel, selectedChips, availableChips): void {
    this.devProfileService[selectedChips] = this.devProfileService[selectedChips].filter(item => item.value !== chip.value);
    this.devProfileService[availableChips].push(chip);
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
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private updateChips(devProperties: DevProperties): void {
    // selectedChips = [ ...chips ] || [];
    // availableChips = xorBy(selectedChips, availableChips);

    this.devProfileService.selectedCategories = devProperties.categories ? [...devProperties.categories] : [];
    this.devProfileService.selectedSkills = devProperties.skills ? [...devProperties.skills] : [];

    // this.devProfileService.selectedSoftSkills = [...devProperties.softSkills] || [];
    // this.devProfileService.selectedLanguages = [...devProperties.languages] || [];

    // this.devProfileService.availableCategories = this.devProfileService.availableCategories
    //   .filter(
    //     (category) => !this.devProfileService.selectedCategories.find(selectedCat => selectedCat.value === category.value)
    //   );

    // this.devProfileService.availableSkills = this.devProfileService.availableSkills
    //   .filter(
    //     (skill) => !this.devProfileService.selectedSkills.find(selectedSkill => selectedSkill.value === skill.value)
    //   );
  }

}
