import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { ChatComponent } from './chat.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';

import { ContenteditableControlValueAccessor } from './wysiwyg/contenteditable.directive';

const routes: Routes = [
  { path: '', component: ChatComponent },
];

@NgModule({
  declarations: [
    ChatComponent,
    WysiwygComponent,
    ContenteditableControlValueAccessor
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PagesSharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule {
}
