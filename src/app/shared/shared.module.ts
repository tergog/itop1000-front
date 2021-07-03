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
import { PortalModule } from '@angular/cdk/portal';

import { ResumeService } from './services/resume.service';
import { SelectComponent } from './components/select/select.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { InputComponent } from 'app/shared/components/input/input.component';
import { TimezoneComponent } from './components/timezone/timezone.component';
import { ClickedOutsideDirective } from './directives/click-outside.directive';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { AddressComponent } from 'app/shared/components/address/address.component';
import { PhoneRegexComponent } from './components/phone-regex/phone-regex.component';
import { CheckboxComponent } from 'app/shared/components/checkbox/checkbox.component';
import { TextareaComponent } from 'app/shared/components/textarea/textarea.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { AlertContainerComponent } from 'app/auth/components/alert-container/alert-container.component';


@NgModule({
  declarations: [
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
    ProfileCardComponent,
    SidenavComponent,
    ClickedOutsideDirective,
    SeparatorComponent,
    TimezoneComponent,
    AddressComponent,
    PhoneRegexComponent,
    SelectComponent,
    DropDownListComponent,
    AlertContainerComponent
  ],
  exports: [
    InputComponent,
    SidenavComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
    ClickedOutsideDirective,
    SeparatorComponent,
    TimezoneComponent,
    AddressComponent,
    PhoneRegexComponent,
    ProfileCardComponent,
    SelectComponent,
    OverlayModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    DropDownListComponent,
    MatAutocompleteModule,
    NgCircleProgressModule,
    AlertContainerComponent,
    ReactiveComponentModule
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
    NgxPhoneMaskModule,
    PortalModule
  ],
  providers: [
    CircleProgressOptions,
    ResumeService
  ],

})
export class SharedModule {}
