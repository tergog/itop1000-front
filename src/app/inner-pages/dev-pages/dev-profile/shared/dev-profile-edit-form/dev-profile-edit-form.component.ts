import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';

import { EDevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models/user-info.model';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NameValueModel } from 'app/shared/models/name-value.model';
import * as fromDevelopers from 'app/core/developers/store';
import { Observable } from 'rxjs';

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
  public avaliableCategories$: Observable<any>;
  public availableSkills$: Observable<any>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public devProfileService: DevProfileService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private developersStore: Store<fromDevelopers.State>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        this.devProfileService.devProperties = userInfo.devProperties ? userInfo.devProperties : {};
        this.updateChips(this.devProfileService.devProperties);
      });
    this.inicializeObservers();
  }

  private inicializeObservers(): void {
    this.avaliableCategories$ = this.developersStore.select(fromDevelopers.getCategories)
    .pipe(
      map(val => val.filter(
        category => !this.devProfileService.selectedCategories.find(
          selectedCat => selectedCat.value === category.value)
      )));
    this.availableSkills$ = this.developersStore.select(fromDevelopers.getSkills)
    .pipe(
      map(val => val.filter(
        skill => !this.devProfileService.selectedSkills.find(
          selectedSkill => selectedSkill.value === skill.value)
      )));
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
      categories: this.devProfileService.selectedCategories
    };
    this.disableEmptyFields();
    this.devProfileService.onSaveClick({devProperties: this.devProfileService.devProperties});
    this.isEdit = false;
  }

  public onChipSelect(chip, selectedChips): void {
    this.devProfileService[selectedChips].push(chip);
    this.inicializeObservers();
    this.resetFocus(selectedChips);
  }

  resetFocus(selectedChips: SelectedChips): void {
    const element = selectedChips === SelectedChips.Category ? this.category : this.skills;
    element.nativeElement.blur();
    setTimeout(() => { element.nativeElement.focus()}, 0);
  }

  public onChipRemove(chip: NameValueModel, selectedChips): void {
    this.devProfileService[selectedChips] = this.devProfileService[selectedChips].filter(item => item.value !== chip.value);
    this.inicializeObservers();
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
    this.devProfileService.selectedCategories = devProperties.categories ? [...devProperties.categories] : [];
    this.devProfileService.selectedSkills = devProperties.skills ? [...devProperties.skills] : [];
  }
}
