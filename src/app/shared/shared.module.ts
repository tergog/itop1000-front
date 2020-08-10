import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';

import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [InputComponent, CheckboxComponent, ButtonComponent, TextareaComponent],
    exports: [
        InputComponent,
        CheckboxComponent,
        ButtonComponent,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatAutocompleteModule,
        MatOptionModule,
        OverlayModule,
        MatDialogModule,
        TextareaComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    OverlayModule,
    MatDialogModule
  ],
  providers: []
})
export class SharedModule { }
