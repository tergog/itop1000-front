import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { RichTextEditorModule } from './message-box/rich-text-editor/rich-text-editor.module';

import { ChatComponent } from './chat.component';
import { SidebarRoomsComponent } from './sidebar-rooms/sidebar-rooms.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: ':id', component: ChatComponent }
];

@NgModule({
  declarations: [
    ChatComponent,
    SidebarRoomsComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PagesSharedModule,
    FormsModule,
    RichTextEditorModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class ChatModule {
}
