import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { ReactiveComponentModule } from '@ngrx/component';

import { InputComponent } from 'app/shared/components/input/input.component';
import { CheckboxComponent } from 'app/shared/components/checkbox/checkbox.component';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { TextareaComponent } from 'app/shared/components/textarea/textarea.component';
import { ClickedOutsideDirective } from './directives/click-outside.directive';
import { SeparatorComponent } from './components/separator/separator.component';
import { TimezoneComponent } from './components/timezone/timezone.component';
import { AddressComponent } from 'app/shared/components/address/address.component';
import { PhoneRegexComponent } from './components/phone-regex/phone-regex.component';
import { ResumeService } from './services/resume.service';
import { SelectComponent } from './components/select/select.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';

@NgModule({
  declarations: [
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
    ClickedOutsideDirective,
    SeparatorComponent,
    TimezoneComponent,
    AddressComponent,
    PhoneRegexComponent,
    SelectComponent,
    DropDownListComponent
  ],
  exports: [
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    OverlayModule,
    TextareaComponent,
    NgCircleProgressModule,
    ClickedOutsideDirective,
    SeparatorComponent,
    TimezoneComponent,
    AddressComponent,
    PhoneRegexComponent,
    SelectComponent,
    DropDownListComponent
  ],
  imports: [
    ReactiveComponentModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    OverlayModule,
    NgCircleProgressModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    NgxPhoneMaskModule
  ],
  providers: [
    CircleProgressOptions,
    ResumeService
  ],

})
export class SharedModule {}
